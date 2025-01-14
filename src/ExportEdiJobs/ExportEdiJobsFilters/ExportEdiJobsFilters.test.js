import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import {
  EXPORT_JOB_STATUS_OPTIONS,
} from '../../common/constants';

import { ExportEdiJobsFilters } from './ExportEdiJobsFilters';

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    AcqDateRangeFilter: jest.fn(({ labelId }) => <span>{labelId}</span>),
    AcqCheckboxFilter: jest.fn(({ options, labelId }) => (
      <>
        <span>{labelId}</span>
        {options.map(({ value }) => <span key={value}>{value}</span>)}
      </>
    )),
    BooleanFilter: jest.fn(({ labelId }) => <span>{labelId}</span>),
    PluggableUserFilter: jest.fn(({ labelId }) => <span>{labelId}</span>),
  };
});
jest.mock('./ExportMethodFilter', () => ({
  ExportMethodFilter: () => <span>ExportMethodFilter</span>,
}));

const defaultProps = {
  activeFilters: {},
  applyFilters: jest.fn(),
  disabled: false,
};

const renderExportEdiJobsFilters = ({
  activeFilters,
  applyFilters,
  disabled,
} = defaultProps) => (render(
  <ExportEdiJobsFilters
    activeFilters={activeFilters}
    applyFilters={applyFilters}
    disabled={disabled}
  />,
));

describe('ExportEdiJobsFilters', () => {
  it('should display filter by status', () => {
    const { getByText } = renderExportEdiJobsFilters();

    expect(getByText('ui-export-manager.exportJob.status')).toBeDefined();

    Object.values(EXPORT_JOB_STATUS_OPTIONS)
      .forEach(({ value }) => expect(getByText(value)).toBeDefined());
  });

  it('should display filter by system source', () => {
    const { getByText } = renderExportEdiJobsFilters();

    expect(getByText('ui-export-manager.exportJob.system')).toBeDefined();
  });

  it('should display filter by source', () => {
    const { getByText } = renderExportEdiJobsFilters();

    expect(getByText('ui-export-manager.exportJob.source')).toBeDefined();
  });

  it('should display filter by start time', () => {
    const { getByText } = renderExportEdiJobsFilters();

    expect(getByText('ui-export-manager.exportJob.startTime')).toBeDefined();
  });

  it('should display filter by end time', () => {
    const { getByText } = renderExportEdiJobsFilters();

    expect(getByText('ui-export-manager.exportJob.endTime')).toBeDefined();
  });

  it('should display filter by export method', () => {
    const { getByText } = renderExportEdiJobsFilters();

    expect(getByText('ExportMethodFilter')).toBeDefined();
  });

  it('should display filter by organization', () => {
    const { getByText } = renderExportEdiJobsFilters();

    expect(getByText('ui-export-manager.exportJob.organization')).toBeDefined();
  });
});
