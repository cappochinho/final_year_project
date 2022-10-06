import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { Field } from 'formik';

const FormInput = (props) => (
  <FormControl
    isRequired={props.isRequired}
    isInvalid={props.errors[props.name] && props.touched[props.name]}
  >
    <FormLabel fontWeight="semibold">{props.label}</FormLabel>
    <Field
      as={Input}
      borderColor={props.borderColor ? props.borderColor : 'gray.400'}
      name={props.name}
      type={props.type}
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      value={props.values[props.name]}
    />
    {props.errors[props.name] && props.touched[props.name] ? (
      <FormErrorMessage fontWeight="bold">
        {props.errors[props.name]}
      </FormErrorMessage>
    ) : null}
  </FormControl>
);

export default FormInput;
