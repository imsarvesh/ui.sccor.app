import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Fonts } from "@/constants/Fonts";
import React, { useState } from "react";
import { Modal, StyleSheet } from "react-native";

interface CalendarModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  textColor: string;
  backgroundColor: string;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isVisible,
  onClose,
  selectedDate,
  onDateSelect,
  textColor,
  backgroundColor,
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[styles.modalContent, { backgroundColor }]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <HStack
            style={styles.modalHeader}
            className="justify-between items-center"
          >
            <Pressable onPress={() => navigateMonth("prev")}>
              <IconSymbol name="chevron.left" size={24} color={textColor} />
            </Pressable>

            <Text style={[styles.modalTitle, { color: textColor }]}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>

            <Pressable onPress={() => navigateMonth("next")}>
              <IconSymbol name="chevron.right" size={24} color={textColor} />
            </Pressable>
          </HStack>

          {/* Calendar Table */}
          <VStack style={styles.calendarTable}>
            {/* Day names header */}
            <HStack style={styles.tableHeader}>
              {dayNames.map((day) => (
                <Box key={day} style={styles.tableHeaderCell}>
                  <Text style={[styles.dayName, { color: textColor }]}>
                    {day}
                  </Text>
                </Box>
              ))}
            </HStack>

            {/* Calendar rows */}
            {Array.from(
              { length: Math.ceil(days.length / 7) },
              (_, weekIndex) => {
                const weekDays = days.slice(weekIndex * 7, (weekIndex + 1) * 7);
                // Ensure we always have 7 cells per row
                const paddedWeekDays = Array.from(
                  { length: 7 },
                  (_, i) => weekDays[i] || null
                );

                return (
                  <HStack key={weekIndex} style={styles.tableRow}>
                    {paddedWeekDays.map((day, dayIndex) => (
                      <Box key={dayIndex} style={styles.tableCell}>
                        <Pressable
                          style={[
                            styles.dayCell,
                            day && isToday(day) && styles.todayCell,
                            day && isSelected(day) && styles.selectedCell,
                          ]}
                          onPress={() => day && onDateSelect(day)}
                          disabled={!day}
                        >
                          {day && (
                            <Text
                              style={[
                                styles.dayText,
                                { color: textColor },
                                isToday(day) && styles.todayText,
                                isSelected(day) && styles.selectedText,
                              ]}
                            >
                              {day.getDate()}
                            </Text>
                          )}
                        </Pressable>
                      </Box>
                    ))}
                  </HStack>
                );
              }
            )}
          </VStack>

          {/* Close button */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={[styles.closeButtonText, { color: textColor }]}>
              Close
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 350,
    maxHeight: "80%",
  },
  modalHeader: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.lexend.bold,
    fontWeight: "600",
  },
  calendarTable: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tableHeaderCell: {
    width: 44,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  dayName: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: Fonts.lexend.medium,
    fontWeight: "500",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  tableCell: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  todayCell: {
    backgroundColor: "rgba(59, 130, 246, 0.1)", // Light blue background for today
  },
  selectedCell: {
    backgroundColor: "#3B82F6", // Blue background for selected date
  },
  dayText: {
    fontSize: 16,
    fontFamily: Fonts.lexend.medium,
    fontWeight: "500",
  },
  todayText: {
    color: "#3B82F6", // Blue text for today
    fontWeight: "600",
  },
  selectedText: {
    color: "#FFFFFF", // White text for selected date
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "#374151",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: Fonts.lexend.medium,
    fontWeight: "600",
  },
});
