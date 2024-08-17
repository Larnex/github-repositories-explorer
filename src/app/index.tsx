import { FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

import type { User } from '@/api/users';
import { useUsers } from '@/api/users';
import { Collapsible } from '@/components';
import { Button, ControlledInput, EmptyList, FocusAwareStatusBar } from '@/ui';

/* 
May only contain alphanumeric characters or hyphens. 
Cannot have multiple consecutive hyphens. 
Cannot begin or end with a hyphen. 
Maximum is 39 characters.
*/

const schema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(39, 'Username must be 39 characters or less')
    .regex(
      /^[a-zA-Z0-9-]*[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*[a-zA-Z0-9-]*$/,
      'Username can only contain alphanumeric characters and hyphens, but cannot contain consecutive hyphens'
    )
    .refine(
      (val: string) => !val.includes('--'),
      'Username cannot contain consecutive hyphens'
    ),
});

type FormData = z.infer<typeof schema>;

export default function HomeScreen() {
  const [username, setUsername] = useState('');

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { data, isLoading, isError, error } = useUsers({ username });

  const onSubmit = (formData: FormData) => {
    setUsername(formData.username);
  };

  const renderItem = useCallback(({ item }: { item: User }) => {
    return <Collapsible login={item.login} avatar_url={item.avatar_url} />;
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="mx-auto w-5/6  py-10">
          <ControlledInput
            placeholder="Enter username"
            control={control}
            name="username"
            testID="username-input"
            onSubmitEditing={handleSubmit(onSubmit)}
            enterKeyHint="search"
            error={
              isError && error instanceof Error
                ? error.message
                : 'Unknown error occurred'
            }
          />

          <Button
            label="Search"
            className="bg-black p-5"
            textClassName="text-white text-xl font-bold text-center"
            icon={<FontAwesome name="search" size={18} color="white" />}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
            loading={isLoading}
            testID="search-button"
          />

          {data && (
            <View>
              <Text
                className="
                my-4
                text-lg
                font-medium
                text-gray-900"
              >
                Showing users by query: {username}
              </Text>
              <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          )}

          {data && data.length === 0 && (
            <EmptyList isLoading={isLoading} message="No users found" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
