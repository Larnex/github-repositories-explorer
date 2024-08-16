import { FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

import type { User } from '@/api/users';
import { useUsers } from '@/api/users/use-user';
import { Button, ControlledInput, EmptyList, FocusAwareStatusBar } from '@/ui';

import { Collapsible } from '../components/collapsible';

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

  // TODO: Trigger onSubmit when user presses enter
  const onSubmit = (formData: FormData) => {
    setUsername(formData.username);
  };

  const renderItem = useCallback(({ item }: { item: User }) => {
    return <Collapsible login={item.login} />;
  }, []);

  // TODO: Fix layout issue when expanding a collapsible
  return (
    <SafeAreaView className="flex-1">
      <FocusAwareStatusBar />
      <View className="m-auto w-4/5 py-10">
        <ControlledInput
          placeholder="Enter username"
          className="mb-5"
          control={control}
          name="username"
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
        />

        {/* TODO: If list is empty, show a message */}
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_) => `${_.id}`}
            ListEmptyComponent={<EmptyList isLoading={isLoading} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
