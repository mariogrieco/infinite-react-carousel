import React from 'react';
import { mount } from 'enzyme';
import { SliderWithVirtualList } from '../testComponent';
import { delay } from '../test-helper';

describe('[Dots]', () => {
  const wrapper = mount(<SliderWithVirtualList />);
  const wrapperInstance = wrapper.instance();
  wrapper.setProps({ dots: true, virtualList: true }).update();
  it('1 dots should slide 1 item', async () => {
    expect(
      wrapper
        .find('.carousel-track')
        .getDOMNode()
        .querySelector('.carousel-item.active')
        .textContent
    ).toEqual('slide1');
    expect(wrapper.state()).toEqual({ currentSlide: null, nextSlide: null, endSlide: null });
    expect(wrapper.find('.carousel-dots .carousel-dots-active').text()).toEqual('1');
    expect(wrapper.find('.carousel-dots').children().length).toEqual(1000);
    await wrapperInstance.testForScroll(() => {
      wrapper.find('.carousel-dots .carousel-dot-3 button').simulate('click');
    }, () => {
      expect(
        wrapper
          .find('.carousel-track')
          .getDOMNode()
          .querySelector('.carousel-item.active')
          .textContent
      ).toEqual('slide3');
      expect(wrapperInstance.getBeforeState()).toEqual({ currentSlide: 0, nextSlide: 2 });
      expect(wrapper
        .find('.carousel-track')
        .getDOMNode()
        .querySelectorAll('.carousel-item').length).toEqual(5);
      expect(wrapper.state().endSlide).toEqual(2);
    },
    2000);
    await wrapperInstance.testForScroll(() => {
      wrapper.find('.carousel-dots .carousel-dot-1 button').simulate('click');
    }, () => {
      expect(
        wrapper
          .find('.carousel-track')
          .getDOMNode()
          .querySelector('.carousel-item.active')
          .textContent
      ).toEqual('slide1');
      expect(wrapperInstance.getBeforeState()).toEqual({ currentSlide: 2, nextSlide: 0 });
      expect(wrapper
        .find('.carousel-track')
        .getDOMNode()
        .querySelectorAll('.carousel-item').length).toEqual(5);
      expect(wrapper.state().endSlide).toEqual(0);
    },
    2000);
  });
  it('1 dots should slide 2 item', async () => {
    wrapper.setProps({ dotsScroll: 2 }).update();
    expect(wrapper
      .find('.carousel-track')
      .getDOMNode()
      .querySelectorAll('.carousel-item').length).toEqual(1000);
    expect(
      wrapper
        .find('.carousel-track')
        .getDOMNode()
        .querySelector('.carousel-item.active')
        .textContent
    ).toEqual('slide1');
    expect(wrapperInstance.getBeforeState()).toEqual({ currentSlide: 2, nextSlide: 0 });
    expect(wrapper.find('.carousel-dots .carousel-dots-active').text()).toEqual('1');
    expect(wrapper.find('.carousel-dots').children().length).toEqual(500);
    await wrapperInstance.testForScroll(() => {
      wrapper.find('.carousel-dots .carousel-dot-3 button').simulate('click');
    }, () => {
      expect(
        wrapper
          .find('.carousel-track')
          .getDOMNode()
          .querySelector('.carousel-item.active')
          .textContent
      ).toEqual('slide5');
      expect(wrapperInstance.getBeforeState()).toEqual({ currentSlide: 0, nextSlide: 4 });
      expect(wrapper
        .find('.carousel-track')
        .getDOMNode()
        .querySelectorAll('.carousel-item').length).toEqual(5);
      expect(wrapper.state().endSlide).toEqual(4);
    });
    await wrapperInstance.testForScroll(() => {
      wrapper.find('.carousel-dots .carousel-dot-2 button').simulate('click');
    }, () => {
      expect(
        wrapper
          .find('.carousel-track')
          .getDOMNode()
          .querySelector('.carousel-item.active')
          .textContent
      ).toEqual('slide3');
      expect(wrapperInstance.getBeforeState()).toEqual({ currentSlide: 4, nextSlide: 2 });
      expect(wrapper
        .find('.carousel-track')
        .getDOMNode()
        .querySelectorAll('.carousel-item').length).toEqual(5);
      expect(wrapper.state().endSlide).toEqual(2);
    },
    2000);
    await wrapperInstance.testForScroll(() => {
      wrapper.find('.carousel-dots .carousel-dot-1 button').simulate('click');
    }, () => {
      expect(
        wrapper
          .find('.carousel-track')
          .getDOMNode()
          .querySelector('.carousel-item.active')
          .textContent
      ).toEqual('slide1');
      expect(wrapperInstance.getBeforeState()).toEqual({ currentSlide: 2, nextSlide: 0 });
      expect(wrapper
        .find('.carousel-track')
        .getDOMNode()
        .querySelectorAll('.carousel-item').length).toEqual(5);
      expect(wrapper.state().endSlide).toEqual(0);
    },
    2000);
  });
  // it('1 dots should slide 3 item', async () => {
  //   wrapper.setProps({ dotsScroll: 3 }).update();
  //   expect(wrapper
  //     .find('.carousel-track')
  //     .getDOMNode()
  //     .querySelectorAll('.carousel-item').length).toEqual(1000);
  //   expect(
  //     wrapper
  //       .find('.carousel-track')
  //       .getDOMNode()
  //       .querySelector('.carousel-item.active')
  //       .textContent
  //   ).toEqual('slide1');
  //   expect(wrapperInstance.getBeforeState()).toEqual({ currentSlide: 2, nextSlide: 0 });
  //   expect(wrapper.find('.carousel-dots .carousel-dots-active').text()).toEqual('1');
  //   expect(wrapper.find('.carousel-dots').children().length).toEqual(2);
  //   await wrapperInstance.testForScroll(() => {
  //     wrapper.find('.carousel-dots .carousel-dot-2 button').simulate('click');
  //   }, () => {
  //     expect(
  //       wrapper
  //         .find('.carousel-track')
  //         .getDOMNode()
  //         .querySelector('.carousel-item.active')
  //         .textContent
  //     ).toEqual('slide4');
  //     expect(wrapperInstance.getBeforeState()).toEqual({ currentSlide: 0, nextSlide: 3 });
  //     expect(wrapper
  //       .find('.carousel-track')
  //       .getDOMNode()
  //       .querySelectorAll('.carousel-item').length).toEqual(5);
  //     expect(wrapper.state().endSlide).toEqual(3);
  //   },
  //   2000);
  //   await wrapperInstance.testForScroll(() => {
  //     wrapper.find('.carousel-dots .carousel-dot-1 button').simulate('click');
  //   }, () => {
  //     expect(
  //       wrapper
  //         .find('.carousel-track')
  //         .getDOMNode()
  //         .querySelector('.carousel-item.active')
  //         .textContent
  //     ).toEqual('slide1');
  //     expect(wrapperInstance.getBeforeState()).toEqual({ currentSlide: 3, nextSlide: 0 });
  //     expect(wrapper
  //       .find('.carousel-track')
  //       .getDOMNode()
  //       .querySelectorAll('.carousel-item').length).toEqual(5);
  //     expect(wrapper.state().endSlide).toEqual(0);
  //   },
  //   2000);
  // });
  // it('1 dots should slide 10 item', async () => {

  // });
});
