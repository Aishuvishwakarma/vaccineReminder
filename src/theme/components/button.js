import { mode } from "@chakra-ui/theme-tools";

export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
        _focus: {
          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
        },
        _active: {
          transform: "scale(0.95)",
        },
      },
      variants: {
        outline: () => ({
          borderRadius: "16px",
          border: "2px solid",
          borderColor: "brand.500",
          color: "brand.500",
          _hover: {
            bg: "brand.100",
          },
        }),
        brand: (props) => ({
          bg: mode(
            "linear-gradient(135deg, #E9E3FF 0%, #422AFB 50%, #728FEA 100%)",
            "linear-gradient(135deg, #422AFB 0%, #728FEA 50%, #E9E3FF 100%)"
          )(props),
          color: "white",
          _focus: {
            bg: mode(
              "linear-gradient(135deg, #E9E3FF 0%, #422AFB 50%, #728FEA 100%)",
              "linear-gradient(135deg, #422AFB 0%, #728FEA 50%, #E9E3FF 100%)"
            )(props),
          },
          _active: {
            bg: mode(
              "linear-gradient(135deg, #E9E3FF 0%, #422AFB 50%, #728FEA 100%)",
              "linear-gradient(135deg, #422AFB 0%, #728FEA 50%, #E9E3FF 100%)"
            )(props),
          },
          _hover: {
            bg: mode(
              "linear-gradient(135deg, #D1C8FF 0%, #3129D9 50%, #6079E7 100%)",
              "linear-gradient(135deg, #3129D9 0%, #6079E7 50%, #D1C8FF 100%)"
            )(props),
          },
        }),
        darkBrand: (props) => ({
          bg: mode("linear-gradient(135deg, #360940 0%, #f05f57 100%)", "linear-gradient(135deg, #f05f57 0%, #360940 100%)")(props),
          color: "white",
          _focus: {
            bg: mode("linear-gradient(135deg, #360940 0%, #f05f57 100%)", "linear-gradient(135deg, #f05f57 0%, #360940 100%)")(props),
          },
          _active: {
            bg: mode("linear-gradient(135deg, #360940 0%, #f05f57 100%)", "linear-gradient(135deg, #f05f57 0%, #360940 100%)")(props),
          },
          _hover: {
            bg: mode("linear-gradient(135deg, #512b58 0%, #f05f57 100%)", "linear-gradient(135deg, #f05f57 0%, #512b58 100%)")(props),
          },
        }),
        lightBrand: (props) => ({
          bg: mode("linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", "whiteAlpha.100")(props),
          color: mode("brand.500", "white")(props),
          _focus: {
            bg: mode("linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", "whiteAlpha.100")(props),
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
          },
        }),
        light: (props) => ({
          bg: mode("linear-gradient(135deg, #f0f0f0 0%, #c4c4c4 100%)", "whiteAlpha.100")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("linear-gradient(135deg, #f0f0f0 0%, #c4c4c4 100%)", "whiteAlpha.100")(props),
          },
          _active: {
            bg: mode("linear-gradient(135deg, #e0e0e0 0%, #b4b4b4 100%)", "whiteAlpha.100")(props),
          },
          _hover: {
            bg: mode("linear-gradient(135deg, #e0e0e0 0%, #b4b4b4 100%)", "whiteAlpha.200")(props),
          },
        }),
        action: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("secondaryGray.300", "brand.400")(props),
          color: mode("brand.500", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "brand.400")(props),
          },
          _active: { bg: mode("secondaryGray.300", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.200", "brand.400")(props),
          },
        }),
        setup: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("transparent", "brand.400")(props),
          border: mode("1px solid", "0px solid")(props),
          borderColor: mode("secondaryGray.400", "transparent")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("transparent", "brand.400")(props),
          },
          _active: { bg: mode("transparent", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.100", "brand.400")(props),
          },
        }),
      },
    },
  },
};
