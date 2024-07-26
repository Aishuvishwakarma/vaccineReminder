import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Circle,
} from "@chakra-ui/react";
import {
  sendPasswordResetEmail,
  verifyingOtp,
  resetPassword,
} from "../../store/auth/authAction";
import toastr from "toastr";


const steps = [
  { title: "First", description: "Enter your email" },
  { title: "Second", description: "Enter the OTP" },
  { title: "Third", description: "Reset your password" },
];

const StepIndicator = ({ step, index, activeStep }) => {
  const isActive = index === activeStep;
  const isComplete = index < activeStep;
  const circleBg = isComplete
    ? "green.400"
    : isActive
    ? "yellow.400"
    : "gray.400";

  return (
    <Flex align="center">
      <Circle size="24px" bg={circleBg} color="white">
        {isComplete ? "✅" : index + 1}
      </Circle>
      <Box ml={4}>
        <Text fontWeight={isActive ? "bold" : "normal"}>{step.title}</Text>
        <Text fontSize="sm">{step.description}</Text>
      </Box>
    </Flex>
  );
};

const ForgotPassword = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "otp") setOtp(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    try {
      dispatch(sendPasswordResetEmail(email));
      setActiveStep(1); // Move to OTP step
    } catch (error) {
      console.error("Password reset failed:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        toastr.error("Passwords do not match!");
      return;
    }
    try {
      dispatch(resetPassword({ email, otp, new_password: newPassword }));
    } catch (error) {
        toastr.error("Password reset failed:");
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  return (
    <Flex
      direction="column"
      w={{ base: "100%", md: "420px" }}
      maxW="100%"
      background="transparent"
      borderRadius="15px"
      mx={{ base: "auto", lg: "unset" }}
      me="auto"
      mb={{ base: "20px", md: "auto" }}
    >
      <HStack spacing={8} mb={8} justify="center">
        {steps.map((step, index) => (
          <StepIndicator
            key={index}
            step={step}
            index={index}
            activeStep={activeStep}
          />
        ))}
      </HStack>

      {activeStep === 0 && (
        <FormControl as="form" onSubmit={handleSendEmail}>
          <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor}>
            Enter your email address to reset your password
          </FormLabel>
          <Input
            isRequired
            fontSize="sm"
            placeholder="mail@example.com"
            mb="24px"
            size="lg"
            variant="auth"
            onChange={handleChange}
            type="email"
            name="email"
            value={email}
          />
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            type="submit"
          >
            Send OTP
          </Button>
        </FormControl>
      )}
      {activeStep === 1 && (
        <FormControl as="form" onSubmit={handleSubmitOtp}>
          <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor}>
            Enter the OTP sent to your email
          </FormLabel>
          <Input
            isRequired
            fontSize="sm"
            placeholder="Enter OTP"
            mb="24px"
            size="lg"
            variant="auth"
            onChange={handleChange}
            type="text"
            name="otp"
            value={otp}
          />
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            type="submit"
          >
            Verify OTP
          </Button>
        </FormControl>
      )}
      {activeStep === 2 && (
        <FormControl as="form" onSubmit={handleResetPassword}>
          <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor}>
            Enter your new password
          </FormLabel>
          <Input
            isRequired
            fontSize="sm"
            placeholder="New Password"
            mb="24px"
            size="lg"
            variant="auth"
            onChange={handleChange}
            type="password"
            name="newPassword"
            value={newPassword}
          />
          <Input
            isRequired
            fontSize="sm"
            placeholder="Confirm New Password"
            mb="24px"
            size="lg"
            variant="auth"
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
          />
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            type="submit"
          >
            Reset Password
          </Button>
        </FormControl>
      )}
    </Flex>
  );
};

export default ForgotPassword;
