// React Core Imports
import React from 'react';
// Redux Api Imports
import { useGetUsersQuery } from '@/store/apis';
// Local - Layout Imports
import MainLayout from '@/layouts/main_layout';

const NotesDashboardView: React.FC = () => {
  // TODO: Remove after testing
  const { data } = useGetUsersQuery();
  console.log('Test Api data is working: ', data);

  return (
    <MainLayout>
      <p>This is the notes dashboard</p>
    </MainLayout>
  );
};

export default NotesDashboardView;
