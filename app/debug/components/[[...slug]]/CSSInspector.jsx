'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * CSS Inspector - 分析组件使用的 CSS 类名并显示定义
 */
export default function CSSInspector({ show }) {
    const [classNames, setClassNames] = useState(new Set());
    const [cssRules, setCssRules] = useState({});
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!show) return;

        // 延迟执行，确保组件已完全渲染
        const timer = setTimeout(() => {
            extractClassNames();
            extractCSSRules();
        }, 500);

        return () => clearTimeout(timer);
    }, [show]);

    const extractClassNames = () => {
        setLoading(true);

        // 找到组件画布
        const canvas = document.querySelector('.component-canvas');
        if (!canvas) {
            setLoading(false);
            return;
        }

        const classes = new Set();

        // 递归提取所有元素的类名
        const extractFromElement = (element) => {
            if (element.classList) {
                element.classList.forEach(className => {
                    if (className && className !== 'component-canvas') {
                        classes.add(className);
                    }
                });
            }

            // 递归子元素
            Array.from(element.children).forEach(child => {
                extractFromElement(child);
            });
        };

        extractFromElement(canvas);
        setClassNames(classes);
        setLoading(false);
    };

    const extractCSSRules = () => {
        const rules = {};

        try {
            // 遍历所有样式表
            Array.from(document.styleSheets).forEach(sheet => {
                try {
                    // 跳过跨域样式表
                    if (!sheet.cssRules) return;

                    Array.from(sheet.cssRules).forEach(rule => {
                        if (rule.selectorText) {
                            // 提取选择器中的类名
                            const classMatches = rule.selectorText.match(/\.[\w-]+/g);
                            if (classMatches) {
                                classMatches.forEach(match => {
                                    const className = match.substring(1); // 移除前面的点
                                    if (!rules[className]) {
                                        rules[className] = [];
                                    }
                                    rules[className].push({
                                        selector: rule.selectorText,
                                        css: rule.cssText
                                    });
                                });
                            }
                        }
                    });
                } catch (e) {
                    // 忽略跨域错误
                }
            });
        } catch (e) {
            console.error('Error extracting CSS rules:', e);
        }

        setCssRules(rules);
    };

    if (!show) return null;

    const sortedClassNames = Array.from(classNames).sort();
    const foundClasses = sortedClassNames.filter(cn => cssRules[cn]);
    const notFoundClasses = sortedClassNames.filter(cn => !cssRules[cn]);

    return (
        <div className="css-inspector border-top mt-4 pt-4">
            <h5 className="mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
                    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" />
                    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
                    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
                    <polyline points="10 9 9 9 8 9" stroke="currentColor" strokeWidth="2" />
                </svg>
                CSS 类名检查器
            </h5>

            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h6 className="card-title">统计信息</h6>
                            <div className="d-flex justify-content-between mb-2">
                                <span>总类名数:</span>
                                <strong>{sortedClassNames.length}</strong>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-success">已找到定义:</span>
                                <strong className="text-success">{foundClasses.length}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span className="text-muted">未找到定义:</span>
                                <strong className="text-muted">{notFoundClasses.length}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <h6>所有类名列表</h6>
                        <div className="border rounded p-2" style={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
                            {sortedClassNames.map(className => (
                                <div key={className} className="mb-1">
                                    <code className={cssRules[className] ? 'text-success' : 'text-muted'}>
                                        .{className}
                                    </code>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <h6>CSS 定义</h6>
                    {loading && <div className="text-center p-3">加载中...</div>}

                    {!loading && foundClasses.length === 0 && (
                        <div className="alert alert-info">
                            未找到任何 CSS 定义。这可能是因为样式是内联的或来自外部样式表。
                        </div>
                    )}

                    {!loading && foundClasses.length > 0 && (
                        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {foundClasses.map(className => (
                                <div key={className} className="mb-3 border rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
                                    <h6 className="mb-2">
                                        <code className="text-success">.{className}</code>
                                        <span className="badge bg-secondary ms-2">
                                            {cssRules[className].length} 条规则
                                        </span>
                                    </h6>
                                    {cssRules[className].map((rule, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="text-muted small mb-1">
                                                选择器: <code>{rule.selector}</code>
                                            </div>
                                            <pre className="bg-white p-2 border rounded mb-0" style={{ fontSize: '12px' }}>
                                                <code>{rule.css}</code>
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && notFoundClasses.length > 0 && (
                        <div className="mt-3">
                            <details>
                                <summary className="text-muted" style={{ cursor: 'pointer' }}>
                                    未找到定义的类名 ({notFoundClasses.length})
                                </summary>
                                <div className="mt-2 p-2 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
                                    {notFoundClasses.map(className => (
                                        <code key={className} className="d-block text-muted mb-1">
                                            .{className}
                                        </code>
                                    ))}
                                </div>
                            </details>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
