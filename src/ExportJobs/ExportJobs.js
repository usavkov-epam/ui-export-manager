import React from 'react';
import {
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useIntl } from 'react-intl';

import {
  Paneset,
} from '@folio/stripes/components';
import {
  FiltersPane,
  ResetButton,
  ResultsPane,
  SingleSearchForm,
  useLocationFilters,
  useToggle,
} from '@folio/stripes-acq-components';

import { Navigation } from '../common/components';
import { ExportJob } from '../ExportJob';

import {
  useExportJobsQuery,
} from './apiQuery';
import { ExportJobsFilters } from './ExportJobsFilters';
import { ExportJobsList } from './ExportJobsList';

const resetData = () => {};

export const ExportJobs = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const [
    filters,
    searchQuery,
    applyFilters,
    applySearch,
    changeSearch,
    resetFilters,
  ] = useLocationFilters(location, history, resetData);
  const [isFiltersOpened, toggleFilters] = useToggle(true);

  const {
    isLoading,
    exportJobs,
    totalCount,
    loadMore,
  } = useExportJobsQuery(location.search);

  return (
    <Paneset>
      {
        isFiltersOpened && (
          <FiltersPane
            toggleFilters={toggleFilters}
          >
            <Navigation />

            <SingleSearchForm
              applySearch={applySearch}
              changeSearch={changeSearch}
              searchQuery={searchQuery}
              isLoading={isLoading}
              ariaLabelId="ui-export-manager.exportJobs.search"
            />

            <ResetButton
              id="reset-job-exports-filters"
              reset={resetFilters}
              disabled={!location.search || isLoading}
            />

            <ExportJobsFilters
              activeFilters={filters}
              applyFilters={applyFilters}
              disabled={isLoading}
            />
          </FiltersPane>
        )
      }

      <ResultsPane
        title={formatMessage({ id: 'ui-export-manager.exportJobs' })}
        count={totalCount}
        filters={filters}
        toggleFiltersPane={toggleFilters}
        isFiltersOpened={isFiltersOpened}
      >
        <ExportJobsList
          isLoading={isLoading}
          onNeedMoreData={loadMore}
          exportJobs={exportJobs}
          totalCount={totalCount}
          filters={filters}
          isFiltersOpened={isFiltersOpened}
          toggleFilters={toggleFilters}
        />
      </ResultsPane>

      {
        Boolean(params.id) && (
          <ExportJob uuid={params.id} />
        )
      }
    </Paneset>
  );
};
