import { mount } from '@cypress/react'
import {Asyncapi3Comparison, Asyncapi3ChannelComparison, Asyncapi3IdAndAddressComparison, Asyncapi3MetaComparison, Asyncapi3OperationComparison, Asyncapi3SchemaFormatComparison, Asyncapi3ServerComparison} from '../../components/Asyncapi3Comparison'

describe('Asyncapi3Comparison.cy', () => {
  describe('Asyncapi3Comparison', () => {
    it('renders without errors', () => {
      mount(<Asyncapi3Comparison />);
    });
  });
  describe('Asyncapi3ChannelComparison', () => {
    it('renders without errors', () => {
      mount(<Asyncapi3ChannelComparison />);
    });
  });
  describe('Asyncapi3IdAndAddressComparison', () => {
    it('renders without errors', () => {
      mount(<Asyncapi3IdAndAddressComparison />);
    });
  });
  describe('Asyncapi3MetaComparison', () => {
    it('renders without errors', () => {
      mount(<Asyncapi3MetaComparison />);
    });
  });
  describe('Asyncapi3OperationComparison', () => {
    it('renders without errors', () => {
      mount(<Asyncapi3OperationComparison />);
    });
  });
  describe('Asyncapi3SchemaFormatComparison', () => {
    it('renders without errors', () => {
      mount(<Asyncapi3SchemaFormatComparison />);
    });
  });
  describe('Asyncapi3ServerComparison', () => {
    it('renders without errors', () => {
      mount(<Asyncapi3ServerComparison />);
    });
  });
});
