import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export default function SearchInput({
  placeholder = "Search...",
  value,
  onChangeText,
  onFocus,
  autoFocus = false,
}: {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  autoFocus?: boolean;
}) {
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");
  const secondaryText = useThemeColor({}, "secondaryText");
  const primaryText = useThemeColor({}, "primaryText");

  return (
    <View className="px-4 py-3">
      <View
        style={{ backgroundColor: backgroundSecondary }}
        className="flex-row items-center rounded-xl h-12"
      >
        <View className="pl-4 pr-2">
          <Ionicons name="search-outline" size={20} color={secondaryText} />
        </View>
        <View className="flex-1 justify-center">
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={secondaryText}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            autoFocus={autoFocus}
            style={{
              color: primaryText,
              fontSize: 16,
              fontWeight: "normal",
              lineHeight: 20,
              paddingRight: 16,
              paddingLeft: 8,
            }}
          />
        </View>
      </View>
    </View>
  );
}
