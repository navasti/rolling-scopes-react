import styled from 'styled-components';

export const CardWrapper = styled.div`
  justify-content: center;
  margin: 30px 0 15px 0;
  align-items: center;
  display: flex;
`;

export const BaseInformationWrapper = styled.div`
  border-right: 2px solid #444;
  flex-direction: column;
  padding-right: 20px;
  align-items: center;
  margin-right: 20px;
  display: flex;
`;

export const BaseInformationTitle = styled.span`
  text-transform: uppercase;
  letter-spacing: 2px;
  width: max-content;
  font-weight: 600;
  font-size: 1.5rem;
`;

export const BaseInformationImage = styled.img`
  margin-bottom: 10px;
`;

export const DetailWrapper = styled.div`
  margin-top: 5px;
`;

export const DetailTitle = styled.span`
  display: inline-block;
  margin-bottom: 2px;
  font-weight: 600;
`;

export const Details = styled.div`
  min-width: 270px;
`;

export const DetailProperty = styled.p`
  margin-top: 5px;
`;

export const Ability = styled.p`
  font-size: 1.15rem;
  text-transform: capitalize;
`;
