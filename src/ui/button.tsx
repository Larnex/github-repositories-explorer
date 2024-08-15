import { forwardRef } from 'react';
import type {
  ActivityIndicatorProps,
  PressableProps,
  View as ViewType,
} from 'react-native';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import colors from './nativewind-colors';

interface Props extends PressableProps {
  label?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  loaderSize?: ActivityIndicatorProps['size'];
}

export const Button = forwardRef<ViewType, Props>((props, ref) => {
  const {
    label,
    loaderSize = 'small',
    disabled = false,
    loading = false,
    className = '',
    textClassName = '',
    icon,
    ...rest
  } = props;
  return (
    <Pressable
      ref={ref}
      {...rest}
      disabled={disabled}
      className={!disabled ? className : className + ' bg-slate-400'}
    >
      {props.children ? (
        props.children
      ) : (
        <View className="flex-row items-center justify-center gap-4">
          <Text className={textClassName}>{label}</Text>
          {loading ? (
            <ActivityIndicator size={loaderSize} color={colors.white} />
          ) : (
            icon
          )}
        </View>
      )}
    </Pressable>
  );
});
