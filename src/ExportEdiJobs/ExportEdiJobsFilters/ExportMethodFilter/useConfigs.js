import React from 'react';
import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { LIMIT_MAX } from '@folio/stripes-acq-components';

export const useConfigs = () => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'edi-job-configs' });

  const searchParams = {
    query: 'type==EDIFACT_ORDERS_EXPORT',
    limit: LIMIT_MAX,
  };

  const { isFetching, data = {} } = useQuery(
    [namespace],
    () => ky.get('data-export-spring/configs', { searchParams }).json(),
  );

  return ({
    configs: data.configs || [],
    isFetching,
  });
};
