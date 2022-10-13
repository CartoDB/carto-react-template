import useAnimateNumber from 'use-animate-number';

export type AnimationOptions = Partial<{
  duration: number;
  enterance: boolean;
  direct: boolean;
  disabled: boolean;
  decimals: number;
}>;

type AnimatedNumberProps = {
  enabled: boolean;
  value: number;
  options?: AnimationOptions;
  formatter: (n: number) => React.ReactNode;
};

function countDecimals(n: number) {
  if (Math.floor(n) === n) return 0;
  return String(n).split('.')[1]?.length || 0;
}

export default function AnimatedNumber({
  enabled,
  value,
  options,
  formatter,
}: AnimatedNumberProps) {
  const defaultOptions = {
    direct: true,
    decimals: countDecimals(value),
    disabled: enabled === false || value === null || value === undefined,
  };
  const [animated] = useAnimateNumber(value, { ...defaultOptions, ...options });
  return <span>{formatter ? formatter(animated) : animated}</span>;
}
