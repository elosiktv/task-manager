import styled from 'styled-components';
import { gql, useMutation } from "@apollo/client";

import { UserInterface } from '../../features/team/teamSlice';

import InviteItem from '../atoms/InviteItem';

interface IInviteRequests {
    users: [UserInterface];
    teamId: string;
}

const acceptTeamRequestMutation = gql`
    mutation acceptTeamRequest($userId: String!, $teamId: String!) {
        acceptTeamRequest(userId: $userId, teamId: $teamId)
    }
`

const Container = styled.div`
    width: 800px;
    background: ${({theme}) => theme.navActiveBg};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
    margin-bottom: 15px;
`

const InvitesList = styled.ul`
    width: 100%;
    list-style: none;
`


const NoInvitesText = styled.span`
    font-size: 20px;
`

const InviteRequests = ({ users, teamId }: IInviteRequests) => {
    const [ acceptTeamRequest ] = useMutation(acceptTeamRequestMutation);

    const handleAcceptClick = (id: string) => {
        acceptTeamRequest({
            variables: {
                userId: id,
                teamId
            }
        })
    }

    const handleRejectClick = (id: string) => {

    }

    return (
        <Container>
            {
                users.length > 0 ? (
                    <InvitesList>
                        {
                            users.map(user => {
                                return <InviteItem onRejectClick={(e, id) => handleRejectClick(id)} onAcceptClick={(e, id) => handleAcceptClick(id)} key={user.id} {...user} />
                            })
                        }
                    </InvitesList>
                ) : (
                    <NoInvitesText>There are no invites</NoInvitesText>
                )
            }
        </Container>
    );
};

export default InviteRequests;