import React from "react";
import { Text, Linking } from "react-native";

interface LinkifiedTextProps {
  text: string;
  className?: string;
  onHashtagPress?: (hashtag: string) => void;
  onUrlPress?: (url: string) => void;
}

const LinkifiedText: React.FC<LinkifiedTextProps> = ({
  text,
  className,
  onHashtagPress,
  onUrlPress,
}) => {
  const parseText = (text: string) => {
    // Regex patterns for URLs and hashtags
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const hashtagRegex = /#[\w\u0590-\u05ff]+/g;

    const parts = [];
    let lastIndex = 0;
    const matches = [];

    // Find all URLs
    let match;
    while ((match = urlRegex.exec(text)) !== null) {
      matches.push({
        type: "url",
        value: match[0],
        index: match.index,
        length: match[0].length,
      });
    }

    // Find all hashtags
    hashtagRegex.lastIndex = 0;
    while ((match = hashtagRegex.exec(text)) !== null) {
      matches.push({
        type: "hashtag",
        value: match[0],
        index: match.index,
        length: match[0].length,
      });
    }

    // Sort matches by index
    matches.sort((a, b) => a.index - b.index);

    // Build parts array
    matches.forEach((match, index) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          value: text.slice(lastIndex, match.index),
          key: `text-${index}`,
        });
      }

      // Add the match
      parts.push({
        type: match.type,
        value: match.value,
        key: `${match.type}-${index}`,
      });

      lastIndex = match.index + match.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: "text",
        value: text.slice(lastIndex),
        key: "text-end",
      });
    }

    return parts;
  };

  const parts = parseText(text);

  return (
    <Text className={className}>
      {parts.map((part) => {
        if (part.type === "url") {
          return (
            <Text
              key={part.key}
              className="text-primary-500 dark:text-primary-400 underline"
              onPress={() => {
                if (onUrlPress) {
                  onUrlPress(part.value);
                } else {
                  Linking.openURL(part.value);
                }
              }}
            >
              {part.value}
            </Text>
          );
        } else if (part.type === "hashtag") {
          return (
            <Text
              key={part.key}
              className="text-primary-500 dark:text-primary-400 font-medium"
              onPress={() => {
                if (onHashtagPress) {
                  onHashtagPress(part.value);
                }
              }}
            >
              {part.value}
            </Text>
          );
        } else {
          return <Text key={part.key}>{part.value}</Text>;
        }
      })}
    </Text>
  );
};

export default LinkifiedText;
