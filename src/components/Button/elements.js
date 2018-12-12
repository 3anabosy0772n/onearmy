import styled, {
    css
} from 'styled-components';
import Link from 'react-router-dom/Link';

const getBorder = ({
    basic
}) => {
    if (basic) {
        return `borner: 1px solid black;`;
    }

    return `border: none;`;
};

import colors from 'src/themes/colors'

const styles = css `
    display: block;
    text-transform: uppercase;
    text-align: center;
    ${props => getBorder(props)};
    text-decoration: none;
    cursor: pointer;
    font-size: 0.8em;
    color: black;
`;

export const AddTutBtn = styled(Link)
`
  ${styles};
  background-color: ${colors.blue};
  width: 300px;
  height: 50px;
`;
export const AddStepBtn = styled.button `
  ${styles};
  background-color: ${colors.yellow};
  width: 300px;
  height: 90px;
`;
export const SaveTutBtn = styled.button `
  ${styles};
  background-color: ${colors.green};
  width: 100%;
  height: 90px;
  color: white;
  font-size: 1.1em;
`;
export const AButton = styled.a `
  ${styles};
`;
export const Button = styled.button `
  ${styles};
`;
export const LoadButton = styled.button `
  ${styles};
  background-color: ${colors.blue};
  width: 200px;
  height: 50px;
`;
export const InnerButtonText = styled.div `
    margin-left: 5px;
    vertical-align: top;
    margin-top: 5px;
    display: inline-block;
`;
export const Container = styled.div `
    display: inline-flex;
    flex-direction: row;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`;