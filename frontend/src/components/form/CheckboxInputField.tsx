import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface CheckboxInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

const CheckboxInputField = ({name, label, register, registerOptions, error, options, ...props}: CheckboxInputFieldProps) => {
    return (
        <div>
            <Form.Group className="mb-3" controlId={name + "-input"}>
                <Form.Check type="checkbox" label={label} {...props} {...register(name, registerOptions)} />
            </Form.Group>
        </div>
    );

}

export default CheckboxInputField;