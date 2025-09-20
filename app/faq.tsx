import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "../components/ui";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FAQItem {
  id: string;
  title: string;
  content: string;
}

interface ContactItem {
  id: string;
  label: string;
  value: string;
  hasArrow?: boolean;
}

const FAQPage: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqData: FAQItem[] = [
    {
      id: "account",
      title: "Account",
      content: "Account-related questions and answers will appear here.",
    },
    {
      id: "achievements",
      title: "Achievements",
      content: "Information about achievements and how to earn them.",
    },
    {
      id: "privacy",
      title: "Privacy",
      content: "Privacy settings and data protection information.",
    },
  ];

  const troubleshootingData: FAQItem[] = [
    {
      id: "login",
      title: "Login Issues",
      content: "Common login problems and solutions.",
    },
    {
      id: "posting",
      title: "Posting Problems",
      content: "Help with posting content and troubleshooting.",
    },
    {
      id: "performance",
      title: "App Performance",
      content: "Performance optimization and app speed issues.",
    },
  ];

  const contactData: ContactItem[] = [
    { id: "email", label: "Email", value: "support@example.com" },
    { id: "support", label: "Contact Support", value: "", hasArrow: true },
  ];

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderFAQSection = (title: string, items: FAQItem[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.faqContainer}>
        {items.map((item, index) => (
          <View
            key={item.id}
            style={[styles.faqItem, index > 0 && styles.faqItemBorder]}
          >
            <TouchableOpacity
              style={styles.faqHeader}
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.faqTitle}>{item.title}</Text>
              <Ionicons
                name={
                  expandedItems.has(item.id) ? "chevron-up" : "chevron-down"
                }
                size={20}
                color="#0d141c"
                style={[
                  styles.chevron,
                  expandedItems.has(item.id) && styles.chevronRotated,
                ]}
              />
            </TouchableOpacity>
            {expandedItems.has(item.id) && (
              <Text style={styles.faqContent}>{item.content}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderContactSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Us</Text>
      {contactData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.contactItem}
          activeOpacity={0.7}
          onPress={() => {
            if (item.id === "support") {
              // Handle contact support action
              console.log("Contact support pressed");
            }
          }}
        >
          <Text style={styles.contactLabel}>{item.label}</Text>
          <View style={styles.contactValue}>
            {item.value ? (
              <Text style={styles.contactText}>{item.value}</Text>
            ) : (
              <Ionicons name="chevron-forward" size={24} color="#0d141c" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#0d141c" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* FAQ Section */}
        {renderFAQSection("FAQs", faqData)}

        {/* Contact Section */}
        {renderContactSection()}

        {/* Troubleshooting Section */}
        {renderFAQSection("Troubleshooting", troubleshootingData)}

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", // slate-50
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
    backgroundColor: "#f8fafc",
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d141c",
    textAlign: "center",
    paddingRight: 48,
  },
  headerSpacer: {
    width: 48,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d141c",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  faqContainer: {
    paddingHorizontal: 16,
  },
  faqItem: {
    paddingVertical: 8,
  },
  faqItemBorder: {
    borderTopWidth: 1,
    borderTopColor: "#cedbe8",
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  faqTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0d141c",
    flex: 1,
  },
  chevron: {
    marginLeft: 24,
  },
  chevronRotated: {
    transform: [{ rotate: "180deg" }],
  },
  faqContent: {
    fontSize: 14,
    color: "#49739c",
    paddingBottom: 8,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    minHeight: 56,
    backgroundColor: "#f8fafc",
  },
  contactLabel: {
    fontSize: 16,
    color: "#0d141c",
    flex: 1,
  },
  contactValue: {
    alignItems: "center",
    justifyContent: "center",
  },
  contactText: {
    fontSize: 16,
    color: "#0d141c",
  },
  bottomSpacer: {
    height: 20,
    backgroundColor: "#f8fafc",
  },
});

export default FAQPage;
