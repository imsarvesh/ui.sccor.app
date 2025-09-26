import { Header } from "@/components";
import { MonthlyCalendar, WorkoutPost } from "@/components/MonthlyCalendar";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "@/components/ui";

export default function CalendarScreen() {
  const backgroundColor = useThemeColor({}, "background");

  // Generate random activity data for the current month and next month
  const generateRandomActivityData = () => {
    const data: { [date: string]: { completed: boolean; count: number } } = {};
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Generate data for current month and next month
    for (let month = currentMonth; month <= currentMonth + 1; month++) {
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

      // Randomly select 40-60% of days as completed
      const completedDays = Math.floor(
        daysInMonth * (0.4 + Math.random() * 0.2)
      );
      const selectedDays = new Set<number>();

      // Select random days
      while (selectedDays.size < completedDays) {
        const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
        selectedDays.add(randomDay);
      }

      // Add completed days to data
      selectedDays.forEach((day) => {
        const dateString = `${currentYear}-${String(month + 1).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`;
        data[dateString] = {
          completed: true,
          count: Math.floor(Math.random() * 4) + 1, // Random count between 1-4
        };
      });
    }

    return data;
  };

  // Sample workout data - in a real app, this would come from your data source
  const generateSampleWorkoutData = (): { [date: string]: WorkoutPost } => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const formatDate = (date: Date) => {
      return date.toISOString().split("T")[0];
    };

    return {
      [formatDate(today)]: {
        id: 1,
        user: {
          name: "Ethan Walker",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBlXu1dn4IN38F65vzxPDTG45ftnXxhmNpkjdJSd_OjElyCTdFyyhW_7kQcpLe2XZ7i65VUOibkr1HQCeNPDGzo12L3p6Avszg41u81mA9sfV_Hhpb-dhUmVvpmADtfqwHakrC68RrwqZeuB3xNE_QnY_N7CgN1tE4LNX0Rhd8k6Nk_CSCHesEEt7zk--jMb2kgzw_1DrHGAuLUhagKHI0AlANGok4hxLgznmDTvS0FEEYsq2-KUUi7ygUIgEbSy-vkES97bEx2QDU",
          timeAgo: "2h",
        },
        content:
          "Just completed an intense HIIT session! 30 minutes of high-intensity intervals with 1-minute rest periods. Feeling energized and ready to tackle the day! 💪 #HIIT #fitness #workout",
        likes: 23,
        comments: 5,
        type: "text",
      },
      [formatDate(yesterday)]: {
        id: 2,
        user: {
          name: "Olivia Hayes",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBV_yB4ZmW1kJiCl9wI_uyab-0c7qze_ODBRoe-kL6I4CcXmtWjbVP7aKb678vEyO89mkdKK27oB7GFSzsn8xDkA0AbfmW1KCaIP5hGs2o-2sD1vwSA9yeC12Dz9wUlFoz7EMpvvPHauPgBQ7TgS9bRp2x_szgCBQNlqvR-P7HosDwX6T11wMZUooHC-5bqroPGjeZJY8AOrimuJd1OniKhI8mzWRlb-Qd9_ET5w88VvlYm-EV2s2DAUbqLAvjxQ0WWR8Y5Trill30",
          timeAgo: "1d",
        },
        content:
          "Morning run in the park! 5K completed in 28 minutes. The weather was perfect and the energy was amazing. Ready for another productive day! 🏃‍♀️ #running #morningrun #5K",
        likes: 45,
        comments: 12,
        type: "text",
      },
      [formatDate(twoDaysAgo)]: {
        id: 3,
        user: {
          name: "Noah Bennett",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC0drkq_gDLrwqdcGSUpHg6ENjtMvvWA-rp_eE0WFQ2fI_4vdLRJ06-EpDc_RWSpIllGllWgOc1NoixBJQISEI7FlxFtpP_M4-S27_5C7-K2_5-8YsXWyoM5toCXCYYmMw03_KGUYw08lE7skfxtJe_IZTjGl3FkuanePWKB_fTZhDVcQFR8mm7n5lvzXLdOHFK477wpkk_Jb2AnAyjMYlSYPz5xqCs5NuH3PhTZsl-7u22-7ulP-LFtpAG-EGQ99bngJ6hPqRm_v0",
          timeAgo: "2d",
        },
        content:
          "Strength training session completed! Focused on upper body today with bench press, pull-ups, and shoulder presses. Feeling stronger every day! 💪 #strengthtraining #upperbody #gym",
        likes: 32,
        comments: 8,
        type: "text",
      },
    };
  };

  // Sample activity data - in a real app, this would come from your data source
  const [activityData] = useState(generateRandomActivityData());

  // Sample workout data
  const [workoutData] = useState(generateSampleWorkoutData());

  const handleDayPress = (date: string) => {
    console.log("Day pressed:", date);
    // Here you can navigate to a detailed view for that day
    // or show a modal with activity details
  };

  const handleMonthChange = (year: number, month: number) => {
    console.log("Month changed to:", year, month);
    // Here you can fetch activity data for the new month
    // setActivityData(newData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView style={{ flex: 1 }}>
        <Header title="" isBack={true} />

        {/* Calendar */}
        <View style={{ width: "100%" }}>
          <MonthlyCalendar
            activityData={activityData}
            workoutData={workoutData}
            onDayPress={handleDayPress}
            onMonthChange={handleMonthChange}
            size="medium"
            showNavigation={true}
            showActivityCount={true}
            showWorkoutPost={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
