import React, { useState, useRef } from "react";
import { Form, Input } from "antd";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export const EditableFormRow = Form.create()(EditableRow);

export const EditableCell = (props) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const input = useRef(null);

  const toggleEdit = () => {
    const editing = !editing;
    setEditing({ editing }, () => {
      if (editing) {
        input.current.focus();
      }
    });
  };

  const save = (e) => {
    const { record, handleSave } = props;
    form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  const renderCell = (form) => {
    setForm(form);
    const { children, dataIndex, record, title } = props;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={(node) => (input.current = node)}
            onPressEnter={save}
            onBlur={save}
          ></Input>
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, minHeight: 32 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  };

  const {
    editable,
    dataIndex,
    title,
    record,
    index,
    hanldeSave,
    children,
    ...restProps
  } = props;

  return (
    <td {...restProps}>
      {editable ? (
        <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
      ) : (
        children
      )}
    </td>
  );
};
