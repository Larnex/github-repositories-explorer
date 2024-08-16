import React from 'react';
import { Text, View } from 'react-native';

import type { Repo } from '@/api/repos';

export const RepoCard = ({ name, stargazers_count, description }: Repo) => {
  return (
    <View className="border-b border-gray-200 p-4">
      <Text className="text-lg font-medium text-gray-900">{name}</Text>
      <Text className="text-sm text-gray-600">⭐ {stargazers_count} Stars</Text>
      {description && (
        <Text className="mt-2 text-sm text-gray-700">{description}</Text>
      )}
    </View>
  );
};
