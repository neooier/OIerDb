import React from 'react';
import {
  Pagination as SemanticUIPagination,
  Icon,
  Select as SemanticUISelect,
} from 'semantic-ui-react';
import useScreenWidthWithin from '@/utils/useScreenWidthWithin';
import usePartialSearchParams from '@/utils/usePartialSearchParams';
import styles from './Pagination.module.less';

interface PaginationProps {
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const [searchParams, setSearchParams] = usePartialSearchParams();

  const screenWidthLessThan376 = useScreenWidthWithin(0, 376);
  const screenWidthLessThan450 = useScreenWidthWithin(0, 450);
  const screenWidthLessThan680 = useScreenWidthWithin(0, 680);
  const screenWidthLessThan768 = useScreenWidthWithin(0, 768);
  const screenWidthLessThan1024 = useScreenWidthWithin(0, 1024);

  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('per_page')) || 30;
  const setPage = (page: string) => setSearchParams({ page });
  const setPerPage = (perPage: number) => {
    const newTotalPages = Math.ceil(total / perPage);
    setSearchParams({
      per_page: perPage.toString(),
      page: newTotalPages < page ? newTotalPages.toString() : page.toString(),
    });
  };
  const totalPages = Math.ceil(total / perPage);

  let siblingRange: number, size: string;
  if (screenWidthLessThan376) {
    siblingRange = 0;
    size = 'small';
  } else if (screenWidthLessThan450) {
    siblingRange = 0;
  } else if (screenWidthLessThan680) {
    siblingRange = 1;
  } else if (screenWidthLessThan768) {
    siblingRange = 2;
  } else if (screenWidthLessThan1024) {
    siblingRange = 3;
  } else {
    siblingRange = 4;
  }

  return (
    <div className={styles.paginationContainer}>
      <SemanticUISelect
        style={{
          minWidth: '90px',
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
        }}
        value={perPage}
        onChange={(e, { value }) => setPerPage(value as number)}
        className={styles.perPageSelect}
        options={[
          { key: 30, value: 30, text: '30/页' },
          { key: 50, value: 50, text: '50/页' },
          { key: 100, value: 100, text: '100/页' },
          { key: 200, value: 200, text: '200/页' },
          { key: 500, value: 500, text: '500/页' },
          { key: 800, value: 800, text: '800/页' },
        ]}
      />
      <SemanticUIPagination
        style={{
          borderLeft: 'none',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        }}
        firstItem={null}
        lastItem={null}
        size={size}
        siblingRange={siblingRange}
        ellipsisItem={{
          content: '...',
          disabled: true,
          icon: true,
        }}
        prevItem={{
          content: <Icon name="angle left" />,
          icon: true,
          disabled: page === 1,
        }}
        nextItem={{
          content: <Icon name="angle right" />,
          icon: true,
          disabled: page === totalPages,
        }}
        activePage={page}
        totalPages={totalPages}
        onPageChange={(_, data) => setPage(data.activePage as string)}
      />
    </div>
  );
};

export default Pagination;
