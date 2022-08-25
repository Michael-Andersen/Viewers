import { utils } from '@ohif/core';
import React from 'react';
import DicomTagBrowser from './components/DicomTagBrowser';
import { useParams, useLocation } from 'react-router';


//import { useQuery } from '@hooks';

const { studyMetadataManager } = utils;

export default function getCommandsModule(servicesManager) {
  const {
    ViewportGridService,
    DisplaySetService
  } = servicesManager.services;

  //const query = useQuery();
  const actions = {
    openDICOMTagViewer() {
      console.log("service2");
      console.log(servicesManager.services);
      console.log(ViewportGridService.getState());
      console.log(DisplaySetService)
      console.log("veiw");
      //  const StudyInstanceUID = query.get('StudyInstanceUIDs');
      const { activeViewportIndex, viewports } = ViewportGridService.getState();
      console.log(viewports);
      const activeViewportSpecificData =
        viewports[activeViewportIndex];
      console.log(activeViewportIndex);
      console.log(activeViewportSpecificData);
      const {
        displaySetInstanceUIDs,
      } = activeViewportSpecificData;

      //const studyMetadata = studyMetadataManager.get(StudyInstanceUID);
      const displaySets = DisplaySetService.activeDisplaySets;
      console.log(displaySets);
      console.log(displaySetInstanceUIDs);
      const { UIModalService } = servicesManager.services;

      const WrappedDicomTagBrowser = function () {
        return (
          <DicomTagBrowser
            displaySets={displaySets}
            displaySetInstanceUID={displaySetInstanceUIDs}
          />
        );
      };
      const displaySetInstanceUID = displaySetInstanceUIDs[0]
      UIModalService.show({
        content: DicomTagBrowser,
        contentProps: {
          displaySets,
          displaySetInstanceUID,
          onClose: UIModalService.hide,
        },
        title: 'About OHIF Viewer'
      });
    },
  };

  const definitions = {
    openDICOMTagViewer: {
      commandFn: actions.openDICOMTagViewer,
      // storeContexts: ['servers', 'viewports'],
    },
  };

  return {
    actions,
    definitions,
    defaultContext: 'TAGBROWSER',
  };
}
