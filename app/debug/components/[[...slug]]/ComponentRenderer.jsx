'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import CSSInspector from './CSSInspector';

export default function ComponentRenderer({ componentPath, componentProps = {}, slug }) {
    const [showCSSInspector, setShowCSSInspector] = useState(true);

    const Component = dynamic(() => import(`@/components/${componentPath}`).catch(err => {
        return () => (
            <div className="alert alert-danger">
                <h4>加载组件时出错</h4>
                <p>无法加载 <code>@/components/{componentPath}</code></p>
                <pre>{err.message}</pre>
                <p>提示：组件应该使用默认导出（default export）</p>
            </div>
        );
    }), {
        loading: () => <div className="p-5 text-center">加载组件中...</div>,
        ssr: false
    });

    const hasProps = componentProps && Object.keys(componentProps).length > 0;

    return (
        <div className="component-viewer">
            <div className="bg-dark text-white p-2 d-flex justify-content-between align-items-center mb-4" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                <span>
                    正在查看: <strong>{slug.join('/')}</strong>
                    {hasProps && <span className="ms-2 badge bg-info">带 props</span>}
                </span>
                <div className="d-flex gap-2">
                    <button
                        onClick={() => setShowCSSInspector(!showCSSInspector)}
                        className={`btn btn-sm ${showCSSInspector ? 'btn-warning' : 'btn-outline-light'}`}
                    >
                        {showCSSInspector ? '隐藏' : '显示'} CSS 检查器
                    </button>
                    <Link href="/debug/components" className="btn btn-sm btn-light">返回列表</Link>
                </div>
            </div>

            <div className="container-fluid">
                <div className="component-canvas border rounded p-4 bg-white">
                    <Suspense fallback={<div>Suspense 加载中...</div>}>
                        <Component {...componentProps} />
                    </Suspense>
                </div>

                <CSSInspector show={showCSSInspector} />
            </div>
        </div>
    );
}
