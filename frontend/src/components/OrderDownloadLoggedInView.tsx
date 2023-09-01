import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { OrderDownloadFields } from "../network/orders_api";
import * as OrdersApi from "../network/orders_api";
import CheckboxInputField from "./form/CheckboxInputField";

const OrdersInputLoggedInView = () => {

    const {
      register,
      handleSubmit,
    } = useForm<OrderDownloadFields>();
    
    async function onSubmit(input: OrderDownloadFields) {
      try {
        const response = await OrdersApi.download(input)
        
        if(response.status !== 200) {
          return alert("Generating CSV failed");
        }

        if(response.data === undefined || response.data === null || response.data === "") {
          return alert("CSV data is empty");
        }

        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;

        fileLink.setAttribute("download", "orders.csv");
        fileLink.setAttribute("target", "_blank");

        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    return (
        <Form id="downloadOrders" onSubmit={handleSubmit(onSubmit)}>
          <Row>Fields</Row>
          <Row>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="User"
                name="user"
                id="user"
                register={register}
              />
            </Col>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="Name"
                name="name"
                id="name"
                register={register}
              />
            </Col>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="Price"
                name="price"
                id="price"
                register={register}
              />
            </Col>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="Currency"
                name="currency"
                id="currency"
                register={register}
              />
            </Col>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="Count"
                name="count"
                id="count"
                register={register}
              />
            </Col>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="Reason"
                name="reason"
                id="reason"
                register={register}
              />
            </Col>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="URL"
                name="url"
                id="url"
                register={register}
              />
            </Col>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="Notes"
                name="notes"
                id="notes"
                register={register}
              />
            </Col>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="Status"
                name="status"
                id="status"
                register={register}
              />
            </Col>
            <Col>
              <CheckboxInputField
                type="checkbox"
                label="Creation Date"
                name="createdAt"
                id="createdAt"
                register={register}
              />
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Download
          </Button>
        </Form>
    );
}

export default OrdersInputLoggedInView;