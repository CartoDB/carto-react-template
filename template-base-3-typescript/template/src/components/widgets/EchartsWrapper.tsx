import { ECharts } from 'echarts';
import ReactEcharts, { EChartsReactProps } from 'echarts-for-react';
import isEqual from 'fast-deep-equal';

export default class EchartsWrapper extends ReactEcharts {
  forceRerender() {
    (this as any).dispose();
    (this as any).renderNewEcharts(); // 重建
  }

  componentDidUpdate(prevProps: EChartsReactProps) {
    /**
     * if shouldSetOption return false, then return, not update echarts options
     * default is true
     */
    const { shouldSetOption } = this.props;
    if (
      typeof shouldSetOption === 'function' &&
      !shouldSetOption?.(prevProps, this.props)
    ) {
      return;
    }

    // 以下属性修改的时候，需要 dispose 之后再新建
    // 1. 切换 theme 的时候
    // 2. 修改 opts 的时候
    if (
      !isEqual(prevProps.theme, this.props.theme) ||
      !isEqual(prevProps.opts, this.props.opts)
    ) {
      this.forceRerender();
      return;
    }

    // 修改 onEvent 的时候先移除历史事件再添加
    const echartsInstance = this.getEchartsInstance();
    if (!isEqual(prevProps.onEvents, this.props.onEvents)) {
      this.offEvents(echartsInstance, prevProps.onEvents!);
      (this as any).bindEvents(echartsInstance, this.props.onEvents);
    }

    // when these props are not isEqual, update echarts
    const pickKeys = [
      'option',
      'notMerge',
      'lazyUpdate',
      'showLoading',
      'loadingOption',
    ] as (keyof EChartsReactProps)[];
    if (!isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))) {
      (this as any).updateEChartsOption();
    }

    /**
     * when style or class name updated, change size.
     */
    if (
      !isEqual(prevProps.style, this.props.style) ||
      !isEqual(prevProps.className, this.props.className)
    ) {
      (this as any).resize();
    }
  }

  offEvents(instance: ECharts, events: Record<string, any>) {
    if (!events) return;
    // loop and off
    for (const eventName in events) {
      if (typeof eventName === 'string') {
        instance.off(eventName);
      }
    }
  }
}

function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const entries = keys.map((key) => [key, obj[key]]);
  return Object.fromEntries(entries);
}
