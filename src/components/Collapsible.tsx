import Ionicons from '@expo/vector-icons/Ionicons';
import { Fragment, useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { Repo } from '@/api/repos';
import { useRepos } from '@/api/repos';
import type { User } from '@/api/users';
import { Button, EmptyList } from '@/ui';
import colors from '@/ui/nativewind-colors';

import { RepoCard } from './repo-card';

export function Collapsible({
  login,
  avatar_url,
}: Pick<User, 'login' | 'avatar_url'>) {
  const [openUsername, setOpenUsername] = useState<string>('');

  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } =
    useRepos({
      username: openUsername,
    });

  const handleToggle = useCallback((username: string) => {
    setOpenUsername((prev) => (prev === username ? '' : username));
  }, []);

  const renderItem = useCallback(({ item }: { item: Repo }) => {
    return <RepoCard {...item} />;
  }, []);

  const renderFooter = useCallback(() => {
    // Hide footer if there are no more pages to fetch

    if (!hasNextPage) {
      return null;
    }

    return (
      <View className="py-50 my-5 flex-row items-center justify-center gap-5 space-x-4">
        <Button
          testID="load-more-button"
          onPress={fetchNextPage}
          label={`Load more from user ${login}`}
          className=" bg-black p-5"
          textClassName="text-white text-md font-bold text-center"
          icon={
            <Ionicons
              name="arrow-down-circle-outline"
              size={18}
              color="white"
            />
          }
          loading={isFetchingNextPage}
          loaderSize={18}
        />
      </View>
    );
  }, [fetchNextPage, isFetchingNextPage, login, hasNextPage]);

  return (
    <View className="border-b border-gray-200 p-4">
      <TouchableOpacity
        onPress={() => handleToggle(login)}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-5 space-x-4">
          <Image
            testID="user-avatar"
            source={{ uri: avatar_url }}
            className="h-10 w-10 rounded-full"
          />
          <Text className="text-lg font-medium text-gray-900">{login}</Text>
        </View>
        {isLoading || isFetchingNextPage ? (
          <ActivityIndicator
            size="small"
            color={colors.black}
            testID="loading-indicator"
          />
        ) : (
          <Ionicons
            name={openUsername === login ? 'chevron-down' : 'chevron-forward'}
            size={24}
            color={colors.neutral[900]}
          />
        )}
      </TouchableOpacity>
      {openUsername === login && data && (
        <Fragment>
          <FlatList
            data={data as Repo[]}
            scrollEnabled={false}
            keyExtractor={(_, i) => `${i}`}
            renderItem={renderItem}
            ListEmptyComponent={
              <EmptyList
                testID="empty-list"
                isLoading={isLoading}
                height={100}
                width={100}
                message="No repositories found"
              />
            }
            ListFooterComponent={renderFooter && renderFooter()}
          />
        </Fragment>
      )}
    </View>
  );
}
