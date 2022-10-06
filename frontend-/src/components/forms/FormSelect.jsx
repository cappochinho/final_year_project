import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { Field } from 'formik';

const FormSelect = (props) => (
  <FormControl
    isRequired={props.isRequired}
    isInvalid={props.errors[props.name] && props.touched[props.name]}
  >
    <FormLabel fontWeight="semibold">{props.label}</FormLabel>
    <Field
      as={Select}
      borderColor={props.borderColor ? props.borderColor : 'gray.400'}
      name={props.name}
      onChange={props.handleChange}
      value={props.values[props.name]}
    >
      <option value="">------------------</option>
      {props.options?.map((option) => (
        <option key={option['id']} value={option[props.option_value]}>
          {option[props.option_label]}
        </option>
      ))}
    </Field>
    {props.errors[props.name] && props.touched[props.name] ? (
      <FormErrorMessage fontWeight="bold">
        {props.errors[props.name]}
      </FormErrorMessage>
    ) : null}
  </FormControl>
);

export default FormSelect;
