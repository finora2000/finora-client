import { numberFormatter } from "@/helpers";
import { AppState } from "@/store/store";
import { userAction } from "@/store/userSlice";
import { Avatar, Box, Flex, Header, Menu, Text } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppHeader = () => {
  const balance = useSelector(
    (state: AppState) =>
      state.portfolio.balance || { cash: 0, savings: 0, invested: 0 }
  );
  const dispatch = useDispatch();
  const totalBalance = +balance.cash + +balance.savings + +balance.invested;

  const logout = () => dispatch(userAction.logout({}));

  return (
    <Header
      height={60}
      sx={{
        width: "100%",
        "@media (max-width: 40em)": {
          padding: "none",
          flex: "1 1",
        },
      }}
      p="xs"
    >
      <Flex
        justify={"space-between"}
        w="100%"
        h="100%"
        px="10px"
        align="center"
      >
        <Box>
          <Image alt="" width={130} height={30} src="/logo-white.PNG" />
        </Box>
        <Flex gap="sm">
          <Menu trigger="hover" openDelay={100}>
            <Menu.Target>
              <Text
                sx={{
                  border: "1px solid gray",
                  borderRadius: "100px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  color: "rgba(0,0,0,0.80)",
                }}
              >
                Balance: ${numberFormatter(totalBalance, "compact")}
              </Text>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item w="140px">
                <Flex align={"center"}>
                  <Box
                    h="10px"
                    w="10px"
                    sx={{
                      border: "0px solid white",
                      borderRadius: "100px",
                      backgroundColor: "yellow",
                    }}
                  ></Box>
                  <Text ml="sm">
                    Invested:{" "}
                    {balance.invested
                      ? numberFormatter(balance.invested, "compact")
                      : "N/A"}
                  </Text>
                </Flex>
              </Menu.Item>
              <Menu.Item>
                <Flex align={"center"}>
                  <Box
                    h="10px"
                    w="10px"
                    sx={{
                      border: "0px solid white",
                      borderRadius: "100px",
                      backgroundColor: "lightgreen",
                    }}
                  ></Box>
                  <Text ml="sm">
                    Savings:{" "}
                    {balance.savings
                      ? numberFormatter(balance.savings, "compact")
                      : "N/A"}
                  </Text>
                </Flex>
              </Menu.Item>
              <Menu.Item>
                <Flex align={"center"}>
                  <Box
                    h="10px"
                    w="10px"
                    sx={{
                      border: "0px solid white",
                      borderRadius: "100px",
                      backgroundColor: "gray",
                    }}
                  ></Box>
                  <Text ml="sm">
                    Cash:{" "}
                    {balance.cash
                      ? numberFormatter(balance.cash, "compact")
                      : "N/A"}
                  </Text>
                </Flex>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Menu openDelay={100}>
            <Menu.Target>
              <Avatar
                style={{ borderRadius: "100px", cursor: "pointer" }}
                color="green"
              >
                JS
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item w="140px">
                <Flex align={"center"} gap="4px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  </svg>
                  <Text>Settings</Text>
                </Flex>
              </Menu.Item>
              <Menu.Item onClick={logout}>
                <Flex align={"center"} gap="4px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 12l-10 0" />
                    <path d="M20 12l-4 4" />
                    <path d="M20 12l-4 -4" />
                    <path d="M4 4l0 16" />
                  </svg>
                  <Text>Signout</Text>
                </Flex>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </Header>
  );
};

export default AppHeader;
