import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const KFDynamicNestedForm = () => {
  const [form] = Form.useForm();
  const [formGroups, setFormGroups] = useState([
    {
      id: 1,
      name: "group1",
      slots: [{ id: 1, name: "slot1", value: "" }],
    },
  ]);

  const addSlot = (groupId) => {
    const updatedFormGroups = formGroups.map((formGroup) => {
      if (formGroup.id === groupId) {
        return {
          ...formGroup,
          slots: [
            ...formGroup.slots,
            {
              id: formGroup.slots.length + 1,
              name: `slot${formGroup.slots.length + 1}`,
              value: "",
            },
          ],
        };
      }
      return formGroup;
    });
    setFormGroups(updatedFormGroups);
  };

  const removeSlot = (groupId, slotId) => {
    const updatedFormGroups = formGroups.map((formGroup) => {
      if (formGroup.id === groupId) {
        return {
          ...formGroup,
          slots: formGroup.slots.filter((slot) => slot.id !== slotId),
        };
      }
      return formGroup;
    });
    setFormGroups(updatedFormGroups);
  };

  const addGroup = () => {
    setFormGroups([
      ...formGroups,
      {
        id: formGroups.length + 1,
        name: `group${formGroups.length + 1}`,
        slots: [
          {
            id: 1,
            name: `_slot1`,
            value: "",
          },
        ],
      },
    ]);
  };

  const removeGroup = (groupId) => {
    setFormGroups(formGroups.filter((formGroup) => formGroup.id !== groupId));
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      className="flex flex-col mx-4 my-6 py-2"
    >
      {formGroups.map((formGroup) => (
        <>
          <div
            key={formGroup.id}
            className="flex flex-row space-x-12 card border px-4 justify-between"
          >
            <div className="flex flex-col">
              <Form.Item
                name={[formGroup.name, "name"]}
                rules={[{ required: true, message: "This field is required" }]}
              >
                <div className="flex flex-row space-x-12 my-2">
                  <h3 className="text-xl font-bold">#</h3>
                  <h3 className="text-xl font-bold">Group</h3>
                  <hr />
                </div>

                <div className="flex flex-row space-x-6">
                  <Form.Item>
                    <Button
                      type="danger"
                      onClick={() => removeGroup(formGroup.id)}
                      block
                      className="bg-red-600 text-white text-center font-bold"
                    >
                      -
                    </Button>
                  </Form.Item>
                  <Input
                    placeholder={formGroup.name}
                    className="h-8 w-44 lg:w-[30rem]"
                  />
                </div>
              </Form.Item>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row space-x-12">
                <h3 className="text-xl font-bold py-2">Slot</h3>
              </div>
              {formGroup.slots.map((slot) => (
                <Form.Item
                  key={slot.id}
                  name={[formGroup.name, slot.name]}
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                  className="flex flex-row"
                >
                  <div className="flex flex-row">
                    <Input
                      placeholder={formGroup.name + "_" + slot.name}
                      className="w-44 lg:w-[45rem] h-8"
                    />
                    <Button
                      type="link"
                      onClick={() => removeSlot(formGroup.id, slot.id)}
                      className="bg-red-600 text-white mx-2 text-center font-bold"
                    >
                      -
                    </Button>
                  </div>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  onClick={() => addSlot(formGroup.id)}
                  className="bg-sky-400 text-white "
                  style={{
                    border: "none",
                    borderRadius: "0",
                  }}
                >
                  + Add Slot
                </Button>
              </Form.Item>
            </div>
          </div>
        </>
      ))}
      <Form.Item>
        <Button
          onClick={addGroup}
          className="bg-sky-600 text-white border-none m-4"
          style={{
            border: "none",
            borderRadius: "0",
          }}
        >
          + Add Group
        </Button>
      </Form.Item>
    </Form>
  );
};

export default KFDynamicNestedForm;
