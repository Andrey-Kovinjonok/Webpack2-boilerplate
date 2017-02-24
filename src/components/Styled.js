import styled from 'styled-components';

export const Body = styled.div`
  text-align:center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  display: block;
  width: 600px;
`;

export const Pane = styled.div`
  display: block;
  margin: 10px;
`;


export const Badge = styled.span`
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 11px;
  font-weight: 600;

  text-shadow: none;
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: 10px;
  color: #fff;
  background-color: #ed5565;

  line-height: 12px;
  padding: 2px 5px;
  position: absolute;
  right: 6px;
  top: 12px;
`;

export const Label = styled.span`
  display: inline;

  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;

  font-size: 10px;
  font-weight: 600;
  text-shadow: none;

  background-color: #ed5565;
  color: #FFFFFF;

  line-height: 12px;
  padding: 2px 5px;
  position: absolute;
  right: -3px;
  top: -3px;
`;
