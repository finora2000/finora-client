import { AxiosRequest } from "@/helpers";
import { portfolioAction } from "@/store/portfolioSlice";
import { userAction } from "@/store/userSlice";
import { Modal, Button, Text, Flex, Input, Notification } from "@mantine/core";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const SignUpModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const login = async (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    setErrorMessage("");

    setLoading(true);
    const loginData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    const response = await new AxiosRequest("/users/login").post(loginData);
    if (!response.error || response.status === 200) {
      redirectToDashBoard(response);
      window.location.href = "/portfolio";
    } else {
      setErrorMessage(response.error);
    }
    setLoading(false);
  };

  const register = async (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    setPasswordDontMatch(false);
    const registerData = {
      first_name: e.target[0].value,
      last_name: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
    };
    if (e.target[3].value !== e.target[4].value)
      return setPasswordDontMatch(true);

    const response = await new AxiosRequest("/users/signup").post(registerData);
    if (!response.error || response.status === 200) {
      redirectToDashBoard(response);
      // router.push("/")
    } else {
      setErrorMessage(response.error);
    }
    setLoading(false);
  };

  const redirectToDashBoard = (response: { data: any }) => {
    localStorage.setItem("token", response.data.token);
    dispatch(userAction.setUserInfo(response.data.user));
    dispatch(portfolioAction.setUserPortfolio(response.data.portfolioDetails));
  };

  return (
    <>
      <Modal
        opened={isOpen}
        centered
        onClose={setIsOpen}
        title={
          isLogin ? (
            <Text fz="lg" fw="bold">
              LOGIN
            </Text>
          ) : (
            <Text fz="lg" fw="bold">
              SIGNUP
            </Text>
          )
        }
      >
        {/* <Box mx="-16px" mt="-16px" mb="lg">
          <BackgroundImage src="/signup-bg-image.jpg">
            <Text px="md" py="30px" color="#fff">
              Finora
            </Text>
          </BackgroundImage>
        </Box> */}
        {isLogin ? (
          <form onSubmit={login}>
            <Input.Wrapper mt="md" label="Email" required>
              <Input
                disabled={loading}
                required
                type="text"
                placeholder="example@email.com"
              ></Input>
            </Input.Wrapper>
            <Input.Wrapper mt="md" label="Password" required>
              <Input
                disabled={loading}
                required
                type="password"
                placeholder="*********"
              ></Input>
            </Input.Wrapper>
            {errorMessage && (
              <Text color="red" fz={"sm"}>
                {errorMessage}
              </Text>
            )}
            <Flex justify={"space-between"} align={"center"} mt="lg">
              <Text fz="sm" opacity={0.7}>
                Don't Have an account?{" "}
                <span
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => {
                    setErrorMessage("");
                    setIsLogin(false);
                  }}
                >
                  {" "}
                  Signup
                </span>
              </Text>

              <Button
                loading={loading}
                type="submit"
                color="green"
                sx={{ cursor: "pointer" }}
              >
                Login
              </Button>
            </Flex>
          </form>
        ) : (
          <form onSubmit={register}>
            <Flex gap={"lg"} justify={"space-between"}>
              <Input.Wrapper sx={{ flex: "1 1" }} label="First Name" required>
                <Input
                  disabled={loading}
                  required
                  type="text"
                  placeholder="John"
                ></Input>
              </Input.Wrapper>
              <Input.Wrapper sx={{ flex: "1 1" }} label="Last Name" required>
                <Input
                  disabled={loading}
                  required
                  type="text"
                  placeholder="Doe"
                ></Input>
              </Input.Wrapper>
            </Flex>
            <Input.Wrapper mt="md" label="Email" required>
              <Input
                disabled={loading}
                type="text"
                required
                placeholder="example@email.com"
              ></Input>
            </Input.Wrapper>
            <Input.Wrapper mt="md" label="Password" required>
              <Input
                disabled={loading}
                type="password"
                required
                placeholder="*********"
              ></Input>
            </Input.Wrapper>
            <Input.Wrapper
              error={passwordDontMatch && "Passwords don't match!"}
              mt="md"
              label="Confirm Password"
              required
              // right={"something"}
            >
              <Input
                disabled={loading}
                type="password"
                required
                placeholder="*********"
              ></Input>
            </Input.Wrapper>
            {errorMessage && (
              <Text color="red" fz={"sm"}>
                {errorMessage}
              </Text>
            )}
            <Flex justify={"space-between"} align={"center"} mt="lg">
              <Text fz="sm" opacity={0.7}>
                Already Have an account?{" "}
                <span
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => {
                    setErrorMessage("");
                    setIsLogin(true);
                  }}
                >
                  {" "}
                  Login
                </span>
              </Text>
              <Button loading={loading} type="submit" color="green">
                Signup
              </Button>
            </Flex>
          </form>
        )}
      </Modal>
    </>
  );
};

export default SignUpModal;
