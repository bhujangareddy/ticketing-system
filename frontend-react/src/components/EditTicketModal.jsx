import { Button, Space, Form, message, Row, Col, App } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../features/ticket/TicketSlice";
import dayjs from "dayjs";
// import TaskFormItems from "./common/TaskFormItems";
import axios from "axios";
// import { handleAxiosError } from "../utils/handleAxiosError";

const EditTicketModal = ({ selectedTask, setOpen }) => {
  // const { message } = App.useApp();
  const email = useSelector((state) => state.Auth.user.email);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleReset = () => form.resetFields();

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish = async (values) => {
    // try {
      console.log("Task Data:", values);
      console.log(selectedTask.id);

    //   const response1 = await axios.get(`http://localhost:3000/users/${email}`);
    //   console.log(
    //     "Fetched the id of current email from Backend logic:",
    //     response1.data.id
    //   );

    //   const response2 = await axios.get(
    //     `http://localhost:3000/users/assignee/${values.assignee}`
    //   );
    //   console.log(response2.data.id);

    //   const taskDetails = {
    //     id: selectedTask.id,
    //     ...values,
    //     reporterId: response1.data.id,
    //     assigneeId: response2.data.id,
    //     dueDate: values.dueDate.format("YYYY-MM-DD"),
    //   };

    //   console.log(taskDetails);

    //   const { data } = await axios.patch(
    //     `http://localhost:3000/tasks/edit/${taskDetails.id}`,
    //     taskDetails
    //   );

    //   console.log("Updated in backend:", data);

    //   dispatch(updateTask(data));
    //   form.resetFields();
    //   setOpen(false);
    //   message.success("Task Updated Successfully");
    // } catch (error) {
    //   handleAxiosError(error);
    // }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        id: selectedTask.id,
        ...selectedTask,
        assignee: selectedTask.assignee?.name || "",  // know about that ?
        reporter: selectedTask.reporter?.name || "", // Make sure selectedTask.assignee and selectedTask.reporter exist before accessing .name
        dueDate: dayjs(selectedTask.dueDate, "YYYY-MM-DD"),
      }}
    >
      {/* <TaskFormItems /> */}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item className="flex justify-start mb-0">
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleReset}>Reset</Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EditTicketModal;
