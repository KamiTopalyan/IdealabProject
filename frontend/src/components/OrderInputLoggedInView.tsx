import { Button, Form, Modal } from "react-bootstrap";
import { UseFormClearErrors, UseFormTrigger, useForm } from "react-hook-form";
import { Order } from "../models/order";
import { OrderInput } from "../network/orders_api";
import * as OrdersApi from "../network/orders_api";
import TextInputField from "./form/TextInputField";

const OrdersInputLoggedInView = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, clearErrors} = useForm<OrderInput>({
        defaultValues: {
            currency: "TL",
            countType: "piece",
        }
    });

    async function onSubmit(input: OrderInput) {
        try {
            let passwordResponse: Order;
            passwordResponse = await OrdersApi.createOrder(input);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add order
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditPasswordForm" onSubmit={handleSubmit(onSubmit)} >

                    <TextInputField
                        name="Name"
                        label="Name"
                        type="Name"
                        placeholder="Name"
                        register={register} 
                        registerOptions={{ required: "Required" }}
                        error={errors.name}
                        autoComplete="off"
                    />

                    <TextInputField
                        name="Price"
                        label="Price"
                        type="Price"
                        placeholder="Currency"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        autoComplete="off"
                    />
                    <TextInputField
                        name="Currency"
                        label="Currency"
                        placeholder="Currency"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.currency}
                        autoComplete="off"
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditPasswordForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrdersInputLoggedInView;