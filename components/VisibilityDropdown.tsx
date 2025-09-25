import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export type VisibilityOption = "Public" | "Private" | "Following";

interface VisibilityDropdownProps {
  value: VisibilityOption;
  onValueChange: (value: VisibilityOption) => void;
  disabled?: boolean;
}

const VisibilityDropdown: React.FC<VisibilityDropdownProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  const colors = useThemeColor({}, "backgroundSecondary");
  const border = useThemeColor({}, "border");
  const primary = useThemeColor({}, "primaryText");
  const icon = useThemeColor({}, "icon");
  const accent = useThemeColor({}, "tabIconSelected");

  const [showModal, setShowModal] = useState(false);

  const getIconName = (option: VisibilityOption) => {
    switch (option) {
      case "Public":
        return "globe-outline";
      case "Private":
        return "lock-closed-outline";
      case "Following":
        return "people-outline";
      default:
        return "globe-outline";
    }
  };

  const handleOptionSelect = (option: VisibilityOption) => {
    onValueChange(option);
    setShowModal(false);
  };

  return (
    <>
      <View className="">
        <TouchableOpacity
          className="flex-row items-center justify-between p-2 rounded-lg"
          style={{
            backgroundColor: colors,
            borderColor: border,
            borderWidth: 0,
          }}
          onPress={() => setShowModal(true)}
          disabled={disabled}
        >
          <View className="flex-row items-center">
            <Ionicons name={getIconName(value)} size={20} color={icon} />
          </View>
          <Ionicons name="chevron-down" size={16} color={icon} />
        </TouchableOpacity>
      </View>

      {/* Visibility Options Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View
            className="w-64 rounded-xl p-4"
            style={{ backgroundColor: colors }}
          >
            <Text
              className="text-lg font-semibold mb-4"
              style={{ color: primary }}
            >
              Post Visibility
            </Text>

            {(["Public", "Private", "Following"] as VisibilityOption[]).map(
              (option) => (
                <TouchableOpacity
                  key={option}
                  className="flex-row items-center p-3 rounded-lg mb-2"
                  style={{
                    backgroundColor: value === option ? accent : "transparent",
                  }}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Ionicons
                    name={getIconName(option)}
                    size={20}
                    color={value === option ? "white" : icon}
                  />
                  <Text
                    className="ml-3 text-base"
                    style={{ color: value === option ? "white" : primary }}
                  >
                    {option}
                  </Text>
                  {value === option && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color="white"
                      style={{ marginLeft: "auto" }}
                    />
                  )}
                </TouchableOpacity>
              )
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default VisibilityDropdown;
