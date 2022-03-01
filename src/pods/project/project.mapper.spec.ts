import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('project mapper specs', () => {
  it('should return empty project when feeding null value', () => {
    const project = null;

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return empty project when feeding undefined value', () => {
    const project = undefined;

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return expected result but feeding null employees list', () => {
    const project: apiModel.Project = {
      id: '729',
      name: 'LemonCode Project',
      externalId: '123345',
      comments: 'Un proyecto muy enriquecedor',
      isActive: true,
      employees: null,
    };

    const expectedResult: viewModel.Project = {
      id: '729',
      name: 'LemonCode Project',
      externalId: '123345',
      comments: 'Un proyecto muy enriquecedor',
      isActive: true,
      employees: [],
    };

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(expectedResult);
  });

  it('should return expected result but feeding undefined employees list', () => {
    const project: apiModel.Project = {
      id: '729',
      name: 'LemonCode Project',
      externalId: '123345',
      comments: 'Un proyecto muy enriquecedor',
      isActive: true,
      employees: null,
    };

    const expectedResult: viewModel.Project = {
      id: '729',
      name: 'LemonCode Project',
      externalId: '123345',
      comments: 'Un proyecto muy enriquecedor',
      isActive: true,
      employees: [],
    };

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(expectedResult);
  });

  it('should return expected result feeding correct values', () => {
    const project: apiModel.Project = {
      id: '729',
      name: 'LemonCode Project',
      externalId: '123345',
      comments: 'Un proyecto muy enriquecedor',
      isActive: true,
      employees: [
        {
          id: '12',
          isAssigned: true,
          employeeName: 'Carmen Luego',
        },
        {
          id: '37',
          isAssigned: false,
          employeeName: 'Victoria Molina',
        },
        {
          id: '80',
          isAssigned: true,
          employeeName: 'Antonio López',
        },
      ],
    };

    const expectedResult: viewModel.Project = {
      id: '729',
      name: 'LemonCode Project',
      externalId: '123345',
      comments: 'Un proyecto muy enriquecedor',
      isActive: true,
      employees: [
        {
          id: '12',
          isAssigned: true,
          employeeName: 'Carmen Luego',
        },
        {
          id: '37',
          isAssigned: false,
          employeeName: 'Victoria Molina',
        },
        {
          id: '80',
          isAssigned: true,
          employeeName: 'Antonio López',
        },
      ],
    };

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(expectedResult);
  });
});
