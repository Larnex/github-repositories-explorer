import React, { useCallback } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

import type { Repo } from '@/api/repos';

export const RepoCard = ({
  name,
  stargazers_count,
  description,
  svn_url,
}: Repo) => {
  const handlePress = useCallback(async () => {
    try {
      await Linking.openURL(svn_url);
    } catch (error) {
      throw error;
    }
  }, [svn_url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="border-b border-gray-200 py-4">
        <Text className="text-lg font-medium text-gray-900">{name}</Text>
        <Text className="text-sm text-gray-600">
          ⭐ {stargazers_count} Stars
        </Text>
        {description && (
          <Text className="mt-2 text-sm text-gray-700">{description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
