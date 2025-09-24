import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { StyleSheet, Modal, TouchableOpacity } from "react-native";
import { CalendarModal } from "@/components/CalendarModal";

interface HorizontalNavBarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: string;
  onSelectedDateChange?: (date: string) => void;
  onSportSelect?: (sport: string) => void;
  selectedSport?: string;
}

export const HorizontalNavBar: React.FC<HorizontalNavBarProps> = ({
  onDateSelect,
  selectedDate: externalSelectedDate,
  onSelectedDateChange,
  onSportSelect,
  selectedSport: externalSelectedSport,
}) => {
  const backgroundColor = useThemeColor({}, "backgroundSecondary");
  const textColor = useThemeColor({}, "primaryText");
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Initialize with today's date formatted
  const getInitialDateString = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const [internalSelectedDate, setInternalSelectedDate] = useState(
    getInitialDateString()
  );
  const [internalSelectedSport, setInternalSelectedSport] = useState("All");

  const selectedDate = externalSelectedDate || internalSelectedDate;
  const setSelectedDate = onSelectedDateChange || setInternalSelectedDate;
  const selectedSport = externalSelectedSport || internalSelectedSport;
  const setSelectedSport = onSportSelect
    ? (value: string) => {
        setInternalSelectedSport(value);
        onSportSelect(value);
      }
    : setInternalSelectedSport;

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    setSelectedDate(formattedDate);
    setIsCalendarVisible(false);
    onDateSelect?.(date);
  };

  const handlePreviousDay = () => {
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    handleDateSelect(previousDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    handleDateSelect(nextDate);
  };

  const handleSportSelect = (sport: string) => {
    setSelectedSport(sport);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const getSportIcon = (sport: string) => {
    const sportIcons: Record<string, string> = {
      Cricket: "sportscourt",
      Soccer: "soccerball",
      Tennis: "tennisball",
    };
    return sportIcons[sport] || null;
  };

  return (
    <Box style={[styles.navBar, {}]}>
      <HStack
        style={styles.navBarContent}
        className="items-center justify-between px-4"
      >
        {/* Sport Dropdown */}
        <Box style={styles.dropdownContainer}>
          <Pressable style={styles.sportDropdown} onPress={toggleDropdown}>
            <HStack style={styles.sportDropdownContent}>
              {selectedSport === "All" ? (
                <Text style={styles.sportDropdownInput}>All</Text>
              ) : (
                <IconSymbol
                  name={getSportIcon(selectedSport) as any}
                  size={20}
                  color="#FFFFFF"
                />
              )}
              <IconSymbol
                name={isDropdownVisible ? "chevron.up" : "chevron.down"}
                size={16}
                color="#FFFFFF"
              />
            </HStack>
          </Pressable>

          <Modal
            visible={isDropdownVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsDropdownVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setIsDropdownVisible(false)}
            >
              <Box style={[styles.dropdownMenu, { backgroundColor }]}>
                {[
                  { name: "All", icon: null },
                  { name: "Cricket", icon: "sportscourt" },
                  { name: "Soccer", icon: "soccerball" },
                  { name: "Tennis", icon: "tennisball" },
                ].map((sport) => (
                  <TouchableOpacity
                    key={sport.name}
                    style={[
                      styles.dropdownItem,
                      selectedSport === sport.name &&
                        styles.dropdownItemSelected,
                    ]}
                    onPress={() => handleSportSelect(sport.name)}
                  >
                    <HStack
                      style={styles.dropdownItemContent}
                      className="items-center gap-2"
                    >
                      {sport.icon && (
                        <IconSymbol
                          name={sport.icon as any}
                          size={16}
                          color={
                            selectedSport === sport.name ? "#3B82F6" : textColor
                          }
                        />
                      )}
                      <Text
                        style={[
                          styles.dropdownItemText,
                          { color: textColor },
                          selectedSport === sport.name &&
                            styles.dropdownItemTextSelected,
                        ]}
                      >
                        {sport.name}
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                ))}
              </Box>
            </TouchableOpacity>
          </Modal>
        </Box>

        {/* Navigation Arrows and Today */}
        <HStack style={styles.navCenter} className="items-center gap-4">
          <Pressable style={styles.navArrow} onPress={handlePreviousDay}>
            <IconSymbol name="chevron.left" size={20} color={textColor} />
          </Pressable>

          <Text style={[styles.navTodayText, { color: textColor }]}>
            {selectedDate}
          </Text>

          <Pressable style={styles.navArrow} onPress={handleNextDay}>
            <IconSymbol name="chevron.right" size={20} color={textColor} />
          </Pressable>
        </HStack>

        {/* Calendar Button */}
        <Pressable
          style={styles.calendarButton}
          onPress={() => setIsCalendarVisible(true)}
        >
          <IconSymbol name="calendar.days" size={20} color="#FFFFFF" />
        </Pressable>
      </HStack>

      {/* Calendar Modal */}
      <CalendarModal
        isVisible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        selectedDate={currentDate}
        onDateSelect={handleDateSelect}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    marginHorizontal: 16,
    borderRadius: 30,
    justifyContent: "center",
  },
  navBarContent: {
    height: "100%",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "relative",
    alignSelf: "center",
  },
  sportDropdown: {
    backgroundColor: "#374151", // Dark gray background
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  sportDropdownContent: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sportDropdownInput: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: Fonts.lexend.bold,
    fontWeight: "700",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 100,
    paddingLeft: 32,
  },
  dropdownMenu: {
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  dropdownItemContent: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dropdownItemSelected: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  dropdownItemText: {
    fontSize: 14,
    fontFamily: Fonts.lexend.medium,
    fontWeight: "500",
  },
  dropdownItemTextSelected: {
    color: "#3B82F6",
    fontWeight: "700",
  },
  navCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navArrow: {
    padding: 8,
  },
  navTodayText: {
    fontSize: 16,
    fontFamily: Fonts.lexend.bold,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  calendarButton: {
    backgroundColor: "#374151", // Dark gray background
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
