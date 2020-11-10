import React, { useEffect } from 'react';
import { Form, Modal, Input } from 'antd';

const SimpleForm = (props) => {
  const { visible, title, onCancel, onSubmit, values, formDetails } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const FormItem = ({ item }) => (
    <Form.Item label={item.label} name={item.name} rules={item.rules}>
      <Input placeholder={item.placeholder} />
    </Form.Item>
  );

  return (
    <Modal
      visible={visible}
      cancelText="Cancel"
      okText="Submit"
      title={title}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((val) => {
          onSubmit(val);
          form.resetFields();
        });
      }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <Form form={form} layout="vertical" initialValues={values} name={formDetails.form_name}>
        {formDetails.form_items.map((item) => (
          <FormItem item={item} />
        ))}
      </Form>
    </Modal>
  );
};

export default SimpleForm;
