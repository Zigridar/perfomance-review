import {IUserWithId} from './ModelTypes';
import {Nullable} from './TypeUtils';

export interface AuthBody {
  login: string;
  password: string;
}

export interface ILoginMessage {
  message: string;
  roomToken: Nullable<string>;
  admin: boolean;
}

export interface IUsersMessage {
  users: IUserWithId[];
}

export interface IUserMessage {
  user: IUserWithId;
}

export interface IRtcDescription {
  candidates: RTCIceCandidate[];
  description: RTCSessionDescriptionInit;
}

export interface IClientDescriptorForUser {
  isControlNow: boolean;
  isAllow: boolean;
  isOnline: boolean;
}

export interface ScreenShotMessage {
  buffer: Buffer;
  fileName: string;
}

export interface Point {
  x: number;
  y: number;
}

/** display dimensions */
export interface IDisplaySize {
  width: number;
  height: number;
  scaleFactor: number;
}

export const CLICK = 'CLICK';
export const POINTER = 'POINTER';
export const WHEEL = 'WHEEL';
export const TEXT = 'TEXT';
export const KEY_CONTROL = 'KEY_CONTROL';

export interface ClickControl {
  type: typeof CLICK;
  point: Point;
}

export interface PointerControl {
  type: typeof POINTER;
  point: Point;
}

export interface WheelControl {
  type: typeof WHEEL;
  deltaX: number;
  deltaY: number;
}

export interface TextControl {
  type: typeof TEXT;
  text: string;
  lang: Lang;
}

export interface KeyControl {
  type: typeof KEY_CONTROL;
  key: string;
}

export type Lang = 'EN' | 'RU';