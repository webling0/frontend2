"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { demoItems } from "@/data/menu";
import { usePathname } from "next/navigation";
import { Modal } from "react-bootstrap";
import { useContextElement } from "@/context/Context";

export default function DemoModal() {
  const pathname = usePathname();
  const { showDemo, setShowDemo } = useContextElement();

  return (
    <Modal
      show={showDemo}
      onHide={() => setShowDemo(false)}
      centered
      dialogClassName="modal-dialog-centered"
      className="modalDemo"
      id="modalDemo"
    >
      <div className="modal-content">
        <div className="mega-menu">
          <div className="row-demo">
            {demoItems.map((item, index) => (
              <div
                className={`demo-item ${pathname === item.href ? "active" : ""
                  }`}
                key={index}
              >
                <Link href={item.href} onClick={() => setShowDemo(false)}>
                  <div className="demo-image position-relative">
                    <Image
                      className="lazyload"
                      alt={item.alt}
                      src={item.src}
                      width={273}
                      height={300}
                    />
                    {item.label.length > 0 && (
                      <div className="demo-label">
                        {item.label.map((label, labelIndex) => (
                          <span
                            key={labelIndex}
                            className={`demo-${label.toLowerCase()}`}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="demo-name">{item.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
