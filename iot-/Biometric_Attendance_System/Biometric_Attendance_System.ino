#include <Adafruit_Fingerprint.h>
#include <EEPROM.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <LiquidCrystal_I2C.h>
#include <WiFiClient.h>
#include <Wire.h>

/*******************************
DEFINITIONS
*******************************/
#define RED_LED 12
#define GREEN_LED 14
#define BUZZER 0
#define REGISTER 15      // To register
#define AUTHENTICATE 13  // To mark attendance
#define REGISTER_BUTTON D0
#define ATTENDANCE_BUTTON D1

/*******************************
VARIABLE DECLARATIONS
*******************************/
struct Variables {
  /* data */
  uint8_t id;
  int wait{ 200 };
  int successBuzz{ 100 };
  int timeOutVal{ 10000 };
  int failureBuzz{ 1000 };
};
bool authMe = 0;

String postData;                                                                         // post array that will be send to the website
String hostCreateFingerprint = "http://192.168.99.32:8000/api/v1/fingerprints/";         // endpoint to create fingerprint
String hostVerifyFingerprint = "http://192.168.99.32:8000/api/v1/fingerprints/verify/";  // endpoint to verify a fingerprint


// Setting up WiFi for pushing data
const char *ssid = "Infinix NOTE 11";
const char *password = "12345670";

Variables var;                       // Structs usage
LiquidCrystal_I2C lcd(0x27, 16, 2);  // LCD definition

#if (defined(__AVR__) || defined(ESP8266)) && !defined(__AVR_ATmega2560__)  // Setting up the fingerprint sensor
SoftwareSerial mySerial(2, 3);
#endif
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

WiFiClient wifiClient;
HTTPClient http;

/*******************************
FUNCTION PROTOTYPES
*******************************/
void connectWiFi();
uint8_t getFingerprintEnroll();
void registerUser();
void failNotity(int, String);
uint8_t getFingerprintID();
void authenticate(int);
void reset();
void promptUser();

/*******************************
FUNCTION DEFINITIONS
*******************************/

// Function to connect the MCU to the Wi-Fi
void connectWiFi() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connecting to...");
  lcd.setCursor(0, 1);
  lcd.print(ssid);
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  lcd.setCursor(0, 0);
  lcd.print("Wi-Fi connected...");
  lcd.setCursor(0, 1);
  lcd.print("@ ");
  lcd.setCursor(1, 1);
  lcd.print(WiFi.localIP());

  delay(2500);
}

// Function to capture new fingerprint
uint8_t getFingerprintEnroll() {
  int id = finger.templateCount + 1;  // New ID
  int p = -1;
  Serial.print("Waiting for valid finger to enroll as # ");
  Serial.println(id);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        break;
      default:
        Serial.println("Unknown error");
        break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      Serial.println(p);
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  Serial.println("Remove finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  Serial.print("ID ");
  Serial.println(id);
  p = -1;
  lcd.clear();
  Serial.println("Place same finger again");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        break;
      default:
        Serial.println("Unknown error");
        break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  Serial.print("Creating model for #");
  Serial.println(var.id);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return false;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    lcd.clear();
    lcd.print("Did not match");
    delay(2000);
    return false;
  } else {
    Serial.println("Unknown error");
    return false;
  }

  Serial.print("ID ");
  Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
    lcd.clear();
    Serial.print("New User");
    lcd.setCursor(0, 1);
    Serial.println("ID: #");
    Serial.print(var.id);
    delay(3000);
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return false;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return false;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return false;
  } else {
    Serial.println("Unknown error");
    return false;
  }

  return true;  // for the actual function: don't touch when editing
}

// Function to save fingerprint and generate finger ID
void registerUser() {
  while (!getFingerprintEnroll())
    ;
  int fingerID = finger.templateCount;  // Gets the number of finger prints.??
  Serial.println(finger.templateCount);

  // Post Data
  postData = String(fingerID);  // Add the Fingerprint ID to the Post array in order to send it
  // Post methode
  String httpRequestData = "{\"fingerprint_id\":\"" + String(fingerID) + "\"}";

  http.begin(wifiClient, hostCreateFingerprint);       // initiate HTTP request, put your Website URL or Your Computer IP
  http.addHeader("Content-Type", "application/json");  // Specify content-type header

  int httpCode = http.POST(httpRequestData);  // Send the request
  String payload = http.getString();          // Get the response payload

  Serial.println("Post Data: " + httpRequestData);      // Post Data
  Serial.println("Reponse Code: " + String(httpCode));  // Print HTTP return code
  Serial.println("Payload :" + payload);                // Print request response payload

  if (httpCode == 201) {
    // String user_name = payload.substring(5);
    Serial.println("Data delivered !!!");
  } else {
    Serial.println("Failed to send !!!");
  }

  postData = "";

  delay(100);

  http.end();  // Close connection
}

// Function to get finger ID of registered users
uint8_t getFingerprintID() {
  uint8_t p = finger.getImage();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.println("No finger detected");
      return 0;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      lcd.clear();
      lcd.print("Try again");
      return 0;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      return 0;
    default:
      Serial.println("Unknown error");
      return 0;
  }

  // OK success!

  p = finger.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return 0;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      lcd.clear();
      lcd.print("Try again");
      return 0;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return 0;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return 0;
    default:
      Serial.println("Unknown error");
      return 0;
  }

  // OK converted!
  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    authMe = 1;
    Serial.println("Found a print match!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    lcd.clear();
    lcd.print("Try again");
    return 0;
  } else if (p == FINGERPRINT_NOTFOUND) {
    Serial.println("Did not find a match");
    return 0;
  } else {
    Serial.println("Unknown error");
    return 0;
  }

  // found a match!
  Serial.print("Found ID #");
  Serial.print(finger.fingerID);
  Serial.print(" with confidence of ");
  Serial.println(finger.confidence);

  Serial.print("Finger ID: ");
  Serial.println(finger.fingerID);


  return finger.fingerID;
}

// Function to authenticate user with server communication
void authenticate(int fingerID) {
  Serial.print("\nAuthenticating FingerID: ");
  Serial.println(fingerID);


  // Post Data
  postData = "auth=" + String(fingerID);  // Add the Fingerprint ID to the Post array in order to send it
  // Post methode
  String httpRequestData = "{\"fingerprint_id\":\"" + String(fingerID - 1) + "\"}";

  http.begin(wifiClient, hostVerifyFingerprint);       // verify fingerprint
  http.addHeader("Content-Type", "application/json");  // Specify content-type header

  int httpCode = http.POST(httpRequestData);  // Send the request
  String payload = http.getString();          // Get the response payload

  Serial.println("Post Data: " + httpRequestData);      // Post Data
  Serial.println("Reponse Code: " + String(httpCode));  // Print HTTP return code
  Serial.println("Payload :" + payload);                // Print request response payload

  if (httpCode == 200) {
    // String user_name = payload.substring(5);
    Serial.print("Welcome ");
    Serial.println(payload);
    lcd.clear();
    lcd.print("Welcome ");
    lcd.setCursor(0, 1);
    lcd.print(payload);
  } else {
    lcd.clear();
    lcd.print("User not found");
  }

  postData = "";

  delay(100);

  http.end();  // Close connection
}

// Function to clear fingerprint database
void reset() {
  finger.emptyDatabase();
  Serial.println("\nReset Complete");
}

void setup() {
  // put your setup code here, to run once:
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(REGISTER, INPUT);
  pinMode(AUTHENTICATE, INPUT);
  pinMode(REGISTER_BUTTON, INPUT);
  pinMode(ATTENDANCE_BUTTON, INPUT);

    // initialize the LCD
    // lcd.begin();
    // lcd.backlight(); // turning on the lcd backlight
    // lcd.print("Hello Welcome");
    // lcd.setCursor(0, 1);
    // lcd.print("Setting up...");

    Serial.begin(9600);
  delay(1000);
  Serial.println("\nAdafruit Fingerprint sensor enrollment");

  // set the data rate for the sensor serial port
  finger.begin(57600);
  while (!finger.verifyPassword()) {
    Serial.println("Searching for fingerprint sensor...");
  }

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  }

  // Get fingerprint sensor details
  Serial.println("Reading sensor parameters");
  finger.getParameters();
  Serial.print("Status: 0x");
  Serial.println(finger.status_reg, HEX);
  Serial.print("Capacity: ");
  Serial.println(finger.capacity);

  // Initializing WiFi connection
  connectWiFi();

  // Count fingerprints available
  finger.getTemplateCount();
  if (finger.templateCount == 0) {
    Serial.print("Sensor doesn't contain any fingerprint data.");
  } else {
    Serial.print("Sensor contains ");
    Serial.print(finger.templateCount);
    Serial.println(" templates");
  }

  delay(100);
}

void loop() {
  int registerButtonValue = digitalRead(REGISTER_BUTTON);
  int attendanceButtonValue = digitalRead(ATTENDANCE_BUTTON);
  
  if (registerButtonValue == HIGH) {
    registerUser();
  }
  if (attendanceButtonValue == HIGH) {
    int myFinger;
    while (authMe == 0)
      myFinger = getFingerprintID();
    if (myFinger > 0)
      authenticate(myFinger);
    authMe = 0;
  }
  // reset();
}