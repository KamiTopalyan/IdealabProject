import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { UseFormClearErrors, UseFormTrigger, useForm } from "react-hook-form";
import { Order } from "../models/order";
import { OrderInput } from "../network/orders_api";
import * as OrdersApi from "../network/orders_api";
import TextInputField from "./form/TextInputField";
import DropboxInputField from "./form/DropboxInputField";

const OrdersInputLoggedInView = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, clearErrors} = useForm<OrderInput>();

    async function onSubmit(input: OrderInput) {
        try {
            input = {
                name: input.name,
                price: (input.price as Number),
                currency: input.currency,
                countType: input.countType,
                count: (input.count as Number),
                reason: input.reason,
                notes: input.notes
            }
            await OrdersApi.createOrder(input);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
                <Form id="addOrder" onSubmit={handleSubmit(onSubmit)} >
                    <Row >
                        <TextInputField
                            name="name"
                            label="Name of Product"
                            type="name"
                            placeholder="Name"
                            register={register} 
                            registerOptions={{ required: "Required" }}
                            error={errors.name}
                            autoComplete="off"
                        />
                    </Row>

                    <Row>
                        <Col>
                            <TextInputField
                                name="count"
                                label="Count"
                                type="count"
                                placeholder="Count"
                                register={register}
                                registerOptions={{ required: "Required" }}
                                autoComplete="off"
                            />
                        </Col>

                        <Col>
                            <DropboxInputField
                                name="countType"
                                label="Count Type"
                                type="countType"
                                register={register}
                                registerOptions={{ required: "Required" }}
                                error={errors.currency}
                                options={["Piece", "Package"]}
                            />
                        </Col>

                        <Col>
                            <TextInputField
                                name="price"
                                label="Price"
                                type="price"
                                placeholder="Price"
                                register={register}
                                registerOptions={{ required: "Required" }}
                                autoComplete="off"

                            />
                        </Col>
                        <Col>
                            <DropboxInputField
                                name="currency"
                                label="Currency"
                                type="currency"
                                register={register}
                                registerOptions={{ required: "Required" }}
                                error={errors.currency}
                                options={["TL", "USD","EURO", "GPD"]}
                
                            />
                        </Col>
                    </Row>

                    <Row>
                        <TextInputField
                                name="reason"
                                label="Reason"
                                type="reason"
                                placeholder="Reason"
                                register={register}
                            />
                    </Row>

                    <Row>
                        <TextInputField
                                name="notes"
                                label="Notes"
                                type="notes"
                                placeholder="Notes"
                                register={register}
                        />
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                
    );
}

export default OrdersInputLoggedInView;