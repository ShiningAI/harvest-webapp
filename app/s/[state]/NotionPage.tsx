"use client";

import * as React from "react";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

import "react-notion-x/src/styles.css";

interface Props {
  recordMap: ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: Props) {
  return <NotionRenderer recordMap={recordMap} darkMode={false} />;
}
