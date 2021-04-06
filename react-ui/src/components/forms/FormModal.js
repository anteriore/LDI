import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import FormItem from './FormItem';

const SimpleForm = (props) => {
  const { visible, title, onCancel, onSubmit, values, formDetails, formMode } = props;
  const [form] = Form.useForm();
  const [processingData, setProcessingData] = useState(false);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form, formDetails]);

  return (
    <Modal
      visible={visible}
      cancelText="Cancel"
      okText="Submit"
      title={title}
      onCancel={onCancel}
      onOk={() => {
        setProcessingData(true)
        form.validateFields().then((formValues) => {
          onSubmit(formValues).then(() => {
            setProcessingData(false)
          })
          form.resetFields();
        });
      }}
      okButtonProps={{ loading: processingData }}
      cancelButtonProps={{ disabled: processingData }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <Form form={form} layout="vertical" name={formDetails.form_name}>
        {formDetails.form_items.map((item) => (
          <FormItem item={item} onFail={onCancel} formMode={formMode} />
        ))}
      </Form>
    </Modal>
  );
};

export default SimpleForm;
