import { FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/ui/button';

import { FocusAwareStatusBar } from '../ui/focus-aware-status-bar';
import { ControlledInput } from '../ui/input';

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
      /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/,
      'Username can only contain alphanumeric characters and hyphens'
    )
    .refine(
      (val) => !val.startsWith('-') && !val.endsWith('-'),
      'Username cannot start or end with a hyphen'
    )
    .refine(
      (val) => !val.includes('--'),
      'Username cannot contain consecutive hyphens'
    ),
});

type FormData = z.infer<typeof schema>;

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted with data:', data);
  };

  return (
    <SafeAreaView className="flex-1">
      <FocusAwareStatusBar />
      <View className="m-auto w-4/5 py-10">
        <ControlledInput
          placeholder="Enter username"
          className="mb-5"
          control={control}
          name="username"
        />

        <Button
          label="Search"
          className="bg-black p-5"
          textClassName="text-white text-xl font-bold text-center"
          icon={<FontAwesome name="search" size={18} color="white" />}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </View>
    </SafeAreaView>
  );
}
