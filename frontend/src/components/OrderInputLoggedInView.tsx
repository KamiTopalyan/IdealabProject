import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { OrderInput } from "../network/orders_api";
import * as OrdersApi from "../network/orders_api";
import TextInputField from "./form/TextInputField";
import DropboxInputField from "./form/DropboxInputField";
import { useState } from "react";
import AlertBox from "./AlertBox"

const OrdersInputLoggedInView = () => {

    const { register, handleSubmit, formState: { errors }} = useForm<OrderInput>();

    const [showSuccessfulOrderAlert, setShowSuccessfulOrderAlert] = useState(false);
    const [showFailedOrderAlert, setShowFailedOrderAlert] = useState(false);
    
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
            setShowSuccessfulOrderAlert(true)
            setShowFailedOrderAlert(false)
        } catch (error) {
            setShowFailedOrderAlert(true)
            setShowSuccessfulOrderAlert(false)
            console.error(error);
            alert(error);
        }
        
    }

    return (
        <div>
            {showSuccessfulOrderAlert && <AlertBox message="Added Order" header="Successful" onDismiss={() => setShowSuccessfulOrderAlert(false)} variant="success"/>}
            {showFailedOrderAlert && <AlertBox message="Adding order failed" header="Failed" onDismiss={() => setShowFailedOrderAlert(false)} variant="danger"/>}
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
                                type="number"
                                min="0"
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
                                type="number"
                                min="0"
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
                </div>
    );
}

export default OrdersInputLoggedInView;