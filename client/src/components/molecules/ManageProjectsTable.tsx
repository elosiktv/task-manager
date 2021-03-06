import styled from 'styled-components';

import { ProjectInterface } from '../../features/team/teamSlice';

import ManageProjectsItem from '../atoms/ManageProjectsItem';

interface IManagerProjectsTable {
    projects: ProjectInterface[] | undefined;
    onProjectDeleteClick: (projectId: string) => void;
}

const Table = styled.table`
    width: 100%;
`

const Thead = styled.thead`
    font-size: 20px;
`

const Tr = styled.tr`

`

const Th = styled.th`
    padding: 20px;
    text-align: left;
`

const Tbody = styled.tbody`
    font-size: 18px;
`

const ManageProjectsTable = ({ projects, onProjectDeleteClick }: IManagerProjectsTable) => {
    if (!projects) return <span>loading</span>
    
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Kanbans</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    projects.map(project => {
                        return <ManageProjectsItem onProjectDeleteClick={(projectId: string) => onProjectDeleteClick(projectId)} buttonsType="table" key={project.id} id={project.id} name={project.name} tasksCounter={project.kanbans ? project.kanbans.length : 0} />
                    })
                }
            </Tbody>
        </Table>
    );
};


export default ManageProjectsTable;