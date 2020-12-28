import React, { useEffect } from 'react';
import { Form, Modal, Input, Select } from 'antd';

const { TextArea } = Input;

const SimpleForm = (props) => {
  const { visible, title, onCancel, onSubmit, values, formDetails } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const FormItem = ({ item }) => {
    if (item.type === 'select') {
      if (typeof item.render === 'undefined') {
        if (typeof item.selectName === 'undefined') {
          item.selectName = 'name';
        }

        if(item.selectName === 'codename'){
          item.render = (choice) => `[${choice.code}] ${choice.name}`;
        }
        else {
          item.render = (choice) => choice[item.selectName];
        }

      }
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <Select placeholder={item.placeholder}>
            {item.choices.map((choice) => (
              <Select.Option value={choice.id}>{item.render(choice)}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
    }
    if (item.type === 'password') {
      return (
        <Form.Item
          label={item.label}
          name={item.name}
          rules={item.rules}
          dependencies={item.dependencies}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
      );
    }
    if (item.type === 'textArea') {
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <TextArea rows={3} maxLength={200} placeholder={item.placeholder} />
        </Form.Item>
      );
    }

    return (
      <Form.Item label={item.label} name={item.name} rules={item.rules}>
        <Input placeholder={item.placeholder} />
      </Form.Item>
    );
  };

  return (
    <Modal
      visible={visible}
      cancelText="Cancel"
      okText="Submit"
      title={title}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((formValues) => {
          onSubmit(formValues);
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