import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import useGoogleSignIn from "./useGoogleSignIn";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const router = useRouter();
  const { promptAsync, isLoading } = useGoogleSignIn({
    onCompleted: () => {
      router.back();
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => !isLoading && promptAsync()}
    >
      {isLoading ? (
        <ActivityIndicator style={styles.icon} />
      ) : (
        <AntDesign name="google" size={20} style={styles.icon} />
      )}
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#CCC",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
    height: 60,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 2,
    shadowColor: "#CCC",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    marginBottom: 10,
    color: "#CCC",
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
