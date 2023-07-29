import { Alert, Box, Notification, Text, Transition } from "@mantine/core";
import DefaultHeader from "@/components/common/DefaultHeader";
import SignUpModal from "@/components/signup/SignupModal";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [showNotification, setshowNotification] = useState(false);
  useEffect(() => {
    if (`${router.query?.status}` === "401") setshowNotification(true);
  }, [router]);
  return (
    <>
      <DefaultHeader />
      {showNotification && (
        <Box pos="absolute" top={5} right={5} w="max-content">
          <Notification
            title="Unauthorized Access!"
            withBorder
            withCloseButton
            color="red"
            onClose={() => setshowNotification(false)}
          >
            Please re-login to access your account!
          </Notification>
        </Box>
      )}
      <Text>Hi</Text>
    </>
  );
}
